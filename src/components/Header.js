import React from "react"
import {Link} from "react-router-dom"

const Header = ({onClickCart}) => {
	return (
		<header className="d-flex justify-between align-center p-40">
			<Link to="/">
				<div className="d-flex align-center">
					<img src="/img/logo.png" width={40} height={40} alt="Логотип" />
					<div>
						<h3 className="text-uppercase">React Sneakers</h3>
						<p className="opacity-5">Магазин лучших кроссовок</p>
					</div>
				</div>
			</Link>
			<ul className="d-flex">
				<li onClick={onClickCart} className="mr-30 cu-p">
					<img src="/img/cart.svg" width={18} height={18} alt="Корзина" />
					<span>1205 руб.</span>
				</li>
				<li>
					<Link to="/favorites">
						<img
							className="cu-p mr-20"
							src="/img/favorites.svg"
							width={18}
							height={18}
							alt="Закладки"
						/>
					</Link>
				</li>
				<li>
					<img
						className="cu-p"
						src="/img/user.svg"
						width={18}
						height={18}
						alt="Пользователь"
					/>
				</li>
			</ul>
		</header>
	)
}

export default Header
