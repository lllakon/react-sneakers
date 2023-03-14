import React, {useEffect, useState} from "react"
import {Route, Routes} from "react-router-dom"
import axios from "axios"
import AppContext from "./context"

import Header from "./components/Header/Header"
import Drawer from "./components/Drawer/Drawer"
import Home from "./pages/Home"
import Orders from "./pages/Orders"

// TODO: Pagination, slider
function App() {
	const [items, setItems] = useState([])
	const [cartItems, setCartItems] = useState([])
	const [searchValue, setSearchValue] = useState("")
	const [cartOpened, setCartOpened] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		async function fetchData() {
			try {
				setIsLoading(true)
				const [cartResponce, itemsResponcse] = await Promise.all([
					axios.get("https://6403d1a280d9c5c7babc2244.mockapi.io/cart"),
					axios.get("https://6403d1a280d9c5c7babc2244.mockapi.io/items"),
				])
				setIsLoading(false)

				setCartItems(cartResponce.data)
				setItems(itemsResponcse.data)
			} catch (error) {
				alert("Ошибка получения данных :(")
				console.log(error)
			}
		}

		fetchData()
	}, [])

	const onAddToCart = async (obj) => {
		try {
			const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id))
			if (findItem) {
				setCartItems((prev) =>
					prev.filter((item) => Number(item.parentId) !== Number(obj.id))
				)
				await axios.delete(
					`https://6403d1a280d9c5c7babc2244.mockapi.io/cart/${findItem.id}`
				)
			} else {
				setCartItems((prev) => [...prev, obj])
				const {data} = await axios.post("https://6403d1a280d9c5c7babc2244.mockapi.io/cart", obj)
				setCartItems((prev) => [...prev.map(item => {
					if (item.parentId === data.parentId) {
						return {
							...item,
							id: data.id
						}
					}
					return item
				})])
			}
		} catch (error) {
			alert("Не удалось добавить в корзину")
		}
	}

	const onRemoveItem = (id) => {
		try {
			axios.delete(`https://6403d1a280d9c5c7babc2244.mockapi.io/cart/${id}`)
			setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)))
		} catch (error) {
			alert("Ошибка при удалении из корзины")
			console.log(error)
		}
	}

	const onChangeSearchInput = (e) => {
		setSearchValue(e.target.value)
	}

	const isItemAdded = (id) => {
		return cartItems.some((obj) => Number(obj.parentId) === Number(id))
	}

	return (
		<AppContext.Provider
			value={{
				items,
				cartItems,
				isItemAdded,
				onAddToCart,
				setCartOpened,
				setCartItems,
			}}
		>
			<div className="wrapper clear">
				<Drawer
					items={cartItems}
					onClose={() => setCartOpened(false)}
					onRemove={onRemoveItem}
					opened={cartOpened}
				/>
				<Header onClickCart={() => setCartOpened(true)} />
				<Routes>
					<Route
						path="/"
						element={
							<Home
								items={items}
								cartItems={cartItems}
								searchValue={searchValue}
								setSearchValue={setSearchValue}
								onChangeSearchInput={onChangeSearchInput}
								onAddToCart={onAddToCart}
								isLoading={isLoading}
							/>
						}
					/>
					<Route path="/orders" element={<Orders />} />
				</Routes>
			</div>
		</AppContext.Provider>
	)
}

export default App
