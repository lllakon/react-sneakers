import React, {useState} from "react"
import axios from "axios"

import Info from "../info"
import { useCart } from "../../hooks/useCart"

import cl from "./Drawer.module.scss"

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const Drawer = ({items = [], onClose, onRemove, opened}) => {
	const {cartItems, setCartItems, totalPrice} = useCart()
	const [orderId, setOrderId] = useState(null)
	const [isOrderComplete, setIsOrderComplete] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const onClickOrder = async () => {
		try {
			setIsLoading(true)
			const {data} = await axios.post("https://640d04261a18a5db836fa653.mockapi.io/orders", {
				items: cartItems,
			})
			setOrderId(data.id)
			setIsOrderComplete(true)
			setCartItems([])
			//
			for (let i = 0; i < cartItems.length; i++) {
				const item = cartItems[i]
				await axios.delete(`https://6403d1a280d9c5c7babc2244.mockapi.io/cart/${item.id}`)
				await delay(400)
			//
			}
		} catch (error) {
			alert('Ошибка при создании заказа :(')
			console.log(error)
		}
		setIsLoading(false)
	}

	return (
		<div className={`${cl.overlay} ${opened ? cl.overlayVisible : ''}`}>
			<div className={cl.drawer}>
				<h2 className="d-flex justify-between mb-30">
					Корзина
					<img
						className="opacity-5 cu-p"
						onClick={onClose}
						width={13}
						src="/img/btn-close.svg"
						alt="Close"
					/>
				</h2>
				{items.length > 0 ? (
					<>
						<div className="items">
							{items.map((item) => (
								<div key={item.id} className="cartItem d-flex align-center mb-20">
									<div
										style={{backgroundImage: `url(${item.imageUrl})`}}
										className="cartItemImg"
									/>
									<div className="mr-20 flex">
										<p className="mb-5">{item.name}</p>
										<b>{item.price} руб.</b>
									</div>
									<img
										className="removeBtn"
										onClick={() => onRemove(item.id)}
										src="/img/btn-remove.svg"
										alt="Remove"
									/>
								</div>
							))}
						</div>
						<div className="cartTotalBlock">
							<ul>
								<li>
									<span>Итого:</span>
									<div></div>
									<b>{totalPrice} руб.</b>
								</li>
								<li>
									<span>Налог 5%</span>
									<div></div>
									<b>{(totalPrice / 100 * 5).toFixed(2)} руб.</b>
								</li>
							</ul>
							<button disabled={isLoading} className="greenButton" onClick={onClickOrder}>
								Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
							</button>
						</div>
					</>
				) : (
					<Info
						title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
						description={
							isOrderComplete
								? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
								: "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ"
						}
						image={
							isOrderComplete ? "/img/complete-order.png" : "/img/empty-cart.png"
						}
					/>
				)}
			</div>
		</div>
	)
}

export default Drawer
