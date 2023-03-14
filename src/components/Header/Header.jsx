import React from "react"
import {Link} from "react-router-dom"
import {useCart} from "../../hooks/useCart"

import cl from './Header.module.scss'

const Header = ({onClickCart}) => {
	const {totalPrice} = useCart()

	return (
		<header className={"d-flex justify-between align-center p-40"}>
			<Link to={process.env.PUBLIC_URL + '/'} className={cl.logo}>
				<div className="d-flex align-center">
					<img src="img/logo.png" width={40} height={40} alt="Логотип" />
					<div>
						<h3 className="text-uppercase">React Sneakers</h3>
						<p className="opacity-5">Магазин лучших кроссовок</p>
					</div>
				</div>
			</Link>
			<ul className="d-flex">
				<li onClick={onClickCart} className="mr-30 cu-p">
					<img src="img/cart.svg" width={18} height={18} alt="Корзина" />
					<span>{totalPrice} руб.</span>
				</li>
				<li>
					<Link to="/orders">
						<img
							src="img/user.svg"
							width={18}
							height={18}
							alt="Пользователь"
						/>
					</Link>
				</li>
			</ul>
		</header>
	)
}

export default Header
