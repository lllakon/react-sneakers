import React, { useContext } from "react"
import ContentLoader from "react-content-loader"
import AppContext from "../../context"

import cl from "./Card.module.scss"

const Card = ({
	id,
	name,
	price,
	imageUrl,
	onPlus,
	isLoading = false
}) => {
	const {isItemAdded} = useContext(AppContext)

	const onClickPlus = () => {
		onPlus({id, parentId: id, name, price, imageUrl})
	}

	return (
		<div className={cl.card}>
			{isLoading ? (
				<>
					<ContentLoader
						speed={2}
						width={170}
						height={222}
						viewBox="0 0 170 227"
						backgroundColor="#f3f3f3"
						foregroundColor="#ecebeb"
					>
						<rect x="0" y="135" rx="3" ry="3" width="159" height="15" />
						<rect x="0" y="156" rx="3" ry="3" width="103" height="15" />
						<rect x="0" y="195" rx="8" ry="8" width="83" height="32" />
						{onPlus && <rect x="127" y="196" rx="8" ry="8" width="33" height="32" />}
						<rect x="0" y="0" rx="10" ry="10" width="159" height="112" />
					</ContentLoader>
				</>
			) : (
				<>
					<img
						className={cl.itemImage}
						src={imageUrl}
						width={133}
						height={112}
						alt="Sneakers"
					/>
					<h5>{name}</h5>
					<div className="d-flex justify-between align-center">
						<div className="d-flex flex-column">
							<span>Цена:</span>
							<b>{price} руб.</b>
						</div>
						{onPlus && <img
							className={cl.plus}
							onClick={onClickPlus}
							src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
							alt="Plus"
						/>}
					</div>
				</>
			)}
		</div>
	)
}

export default Card
