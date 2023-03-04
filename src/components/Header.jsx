import React from "react"

const Header = () => {
	return (
		<header className="d-flex justify-between align-center p-40">
			<div className="d-flex align-center">
				<img src="/img/logo.png" width={40} height={40} alt="Logo" />
				<div>
					<h3 className="text-uppercase">React Sneakers</h3>
					<p className="opacity-5">Магазин лучших кроссовок</p>
				</div>
			</div>
			<ul className="d-flex">
				<li className="mr-30">
					<img src="/img/cart.svg" width={18} height={18} alt="Cart" />
					<span>1205 руб.</span>
				</li>
				<li>
					<img src="/img/user.svg" width={18} height={18} alt="User" />
				</li>
			</ul>
		</header>
	)
}

export default Header
