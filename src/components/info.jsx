import React, {useContext} from "react"
import AppContext from "../context"

const Info = ({title, image, description}) => {
	const {setCartOpened} = useContext(AppContext)

	return (
		<div className="cartEmpty d-flex align-center justify-center flex-column flex">
			<img
				className="mb-20"
				width={120}
				src={image}
				alt="Empty cart"
			/>
			<h2>{title}</h2>
			<p className="opacity6">{description}</p>
			<button className="greenButton" onClick={() => setCartOpened(false)}>
				<img className="leftArrow" src="img/arrow.svg" alt="Arrow" />
				Вернуться назад
			</button>
		</div>
	)
}

export default Info
