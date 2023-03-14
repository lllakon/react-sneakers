import React, {useContext, useEffect, useState} from "react"
import axios from "axios"
import AppContext from "../context"
import Info from "../components/info"
import Card from "../components/Card/Card"

const Orders = () => {
	const {onAddToCart} = useContext(AppContext)
	const [isLoading, setIsLoading] = useState(true)
	const [orders, setOrders] = useState([])
	console.log(orders.length)

	useEffect(() => {
		async function fetchData() {
			try {
				const {data} = await axios.get(
					"https://640d04261a18a5db836fa653.mockapi.io/orders"
				)
				setOrders(data.map((obj) => obj.items).flat())
				setIsLoading(false)
			} catch (error) {
				alert("Ошибка при запросе заказов ")
				console.log(error)
			}
		}

		fetchData()
	}, [])

	return (
		<div className="content p-40">
			<div className="d-flex align-center justify-between mb-40">
				<h1>Мои заказы</h1>
			</div>
			{orders.length > 1 ? (
				(isLoading ? [...Array(8)] : orders).map((item, index) => (
					<div className="orders-wrapper d-flex flex-wrap">
						<Card key={index} isLoading={isLoading} {...item} />
					</div>
				))
			) : (
	
					<Info
						title="У вас нет заказов"
						description="Оформите хотя бы один заказ."
						image="img/sad-emoji.svg"
						imageSize="70"
						backBtn={false}
					/>
	
			)}
		</div>
	)
}

export default Orders
