import React, {useEffect, useState} from "react"
import {Route, Routes} from "react-router-dom"
import axios from 'axios'
import Header from "./components/Header"
import Drawer from "./components/Drawer"
import Card from "./components/Card"

function App() {
	const [items, setItems] = useState([])
	const [cartItems, setCartItems] = useState([])
	const [favorites, setFavorites] = useState([])
	const [searchValue, setSearchValue] = useState("")
	const [cartOpened, setCartOpened] = useState(false)

	useEffect(() => {
			axios.get('https://6403d1a280d9c5c7babc2244.mockapi.io/items')
				.then((res) => setItems(res.data))
			axios.get('https://6403d1a280d9c5c7babc2244.mockapi.io/cart')
				.then((res) => setCartItems(res.data))
	}, [])

	const onAddToCart = (obj) => {
		axios.post("https://6403d1a280d9c5c7babc2244.mockapi.io/cart", obj)
			.then(res => setCartItems(prev => [...prev, res.data])) 
	}

	const onRemoveItem = (id) => {
		axios.delete(`https://6403d1a280d9c5c7babc2244.mockapi.io/cart/${id}`)
		setCartItems((prev) => prev.filter(item => item.id !== id))
	}

	const onAddToFavorite = (obj) => {
		axios.post('https://6403d1a280d9c5c7babc2244.mockapi.io/favorites', obj)
		setFavorites((prev) => [...prev, obj])
	}

	const onChangeSearchInput = (e) => {
		setSearchValue(e.target.value)
	}

	return (
		<div className="wrapper clear">
			{cartOpened && (
				<Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />
			)}
			<Header onClickCart={() => setCartOpened(true)} />

			<Routes>
				<Route path="/test"> Тестовая информация</Route>
			</Routes>

			<div className="content p-40">
				<div className="d-flex align-center justify-between mb-40">
					{searchValue ? <h1 className='text-truncate'>Поиск по запросу: <br/> {searchValue}</h1> : <h1>Все кроссовки</h1>}
					<div className="search-block d-flex">
						<img src="/img/search.svg" alt="Search" />
						{searchValue && (
							<img
								className="clear opacity-5 cu-p"
								onClick={() => setSearchValue("")}
								width={13}
								src="/img/btn-close.svg"
								alt="Clear"
							/>
						)}
						<input
							onChange={onChangeSearchInput}
							value={searchValue}
							placeholder="Поиск"
						/>
					</div>
				</div>

				<div className="d-flex flex-wrap">
					{items
						.filter((item) =>
							item.name.toLowerCase().includes(searchValue.toLowerCase())
						)
						.map((item) => (
							<Card
								key={item.id}
								id={item.id}
								name={item.name}
								price={item.price}
								imageUrl={item.imageUrl}
								onPlus={(obj) => onAddToCart(obj)}
								onFavorite={(obj) => onAddToFavorite(obj)}
							/>
						))}
				</div>
			</div>
		</div>
	)
}

export default App
