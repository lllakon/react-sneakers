import React from "react"

const Drawer = ({items = [], onClose, onRemove}) => {
	return (
		<div className="overlay">
			<div className="drawer">
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
							{items.map((item, i) => (
								<div key={i} className="cartItem d-flex align-center mb-20">
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
									<b>21 498 руб.</b>
								</li>
								<li>
									<span>Налог 5%</span>
									<div></div>
									<b>1074 руб.</b>
								</li>
							</ul>
							<button className="greenButton">
								Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
							</button>
						</div>
					</>
				) : (
					<div className="cartEmpty d-flex align-center justify-center flex-column flex">
						<img
							className="mb-20"
							width={120}
							height={120}
							src="/img/empty-cart.png"
							alt="Empty cart"
						/>
						<h2>Корзина пустая</h2>
						<p className="opacity6">
							Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.
						</p>
						<button className="greenButton" onClick={onClose}>
							<img className="leftArrow" src="/img/arrow.svg" alt="Arrow" />
							Вернуться назад
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default Drawer
