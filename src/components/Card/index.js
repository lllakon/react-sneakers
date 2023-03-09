import React, { useState} from "react"
import cl from "./Card.module.scss"

const Card = ({id, name, price, imageUrl, onFavorite, onPlus}) => {
	const [isAdded, setIsAdded] = useState(false)
	const [isFavorite, setIsFavorite] = useState(false)

	const onClickPlus = () => {
		onPlus({id, name, price, imageUrl})
		setIsAdded(!isAdded)
		setTimeout(() => {
			setIsAdded(false)
		}, 4500)
	}

	const onClickFavorite = () => {
		onFavorite({id, name, price, imageUrl})
		setIsFavorite(!isFavorite)
	}

	return (
		<div className={cl.card}>
			<div className={cl.favorite} onClick={onClickFavorite}>
				<img src={isFavorite ? '/img/liked.svg' : '/img/unliked.svg'} alt="Unliked" />
			</div>
			<img src={imageUrl} width={133} height={112} alt="Sneakers" />
			<h5>{name}</h5>
			<div className="d-flex justify-between align-center">
				<div className="d-flex flex-column">
					<span>Цена:</span>
					<b>{price} руб.</b>
				</div>
				<img
					className={cl.plus}
					onClick={onClickPlus}
					src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
					alt="Plus"
				/>
			</div>
		</div>
	)
}

export default Card
