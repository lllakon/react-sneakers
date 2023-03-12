import React, {useEffect, useState} from "react"
import {Route, Routes} from "react-router-dom"
import axios from "axios"
import AppContext from "./context"

import Header from "./components/Header"
import Drawer from "./components/Drawer"
import Home from "./pages/Home"
import Orders from "./pages/Orders"

function App() {
	const [items, setItems] = useState([])
	const [cartItems, setCartItems] = useState([])
	const [searchValue, setSearchValue] = useState("")
	const [cartOpened, setCartOpened] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		async function fetchData() {
			setIsLoading(true)
			const cartResponce = await axios.get(
				"https://6403d1a280d9c5c7babc2244.mockapi.io/cart"
			)
			const itemsResponcse = await axios.get(
				"https://6403d1a280d9c5c7babc2244.mockapi.io/items"
			)

			setIsLoading(false)
			setCartItems(cartResponce.data)
			setItems(itemsResponcse.data)
		}

		fetchData()
	}, [])

	const onAddToCart = (obj) => {
		try {
			if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
				axios.delete(`https://6403d1a280d9c5c7babc2244.mockapi.io/cart/${obj.id}`)
				setCartItems((prev) =>
					prev.filter((item) => Number(item.id) !== Number(obj.id))
				)
			} else {
				axios.post("https://6403d1a280d9c5c7babc2244.mockapi.io/cart", obj)
				setCartItems((prev) => [...prev, obj])
			}
		} catch (error) {
			alert("Не удалось добавить в корзину")
		}
	}

	const onRemoveItem = (id) => {
		axios.delete(`https://6403d1a280d9c5c7babc2244.mockapi.io/cart/${id}`)
		setCartItems((prev) => prev.filter((item) => item.id !== id))
	}

	const onChangeSearchInput = (e) => {
		setSearchValue(e.target.value)
	}

	const isItemAdded = (id) => {
		return cartItems.some((obj) => Number(obj.id) === Number(id))
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
				{cartOpened && (
					<Drawer
						items={cartItems}
						onClose={() => setCartOpened(false)}
						onRemove={onRemoveItem}
					/>
				)}
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
