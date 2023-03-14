import React from 'react';
import SliderSlick from '../components/Slider/Slider';
import Card from "../components/Card/Card"

const Home = ({
	items,
	searchValue,
	setSearchValue,
	onChangeSearchInput,
	onAddToCart,
	isLoading,
}) => {
	function renderItems() {
		const filteredItems = items.filter((item) =>
			item.name.toLowerCase().includes(searchValue.toLowerCase())
		)

		return (isLoading ? [...Array(12)] : filteredItems).map((item, index) => (
			<Card
				key={index}
				isLoading={isLoading}
				onPlus={(obj) => onAddToCart(obj)}
				{...item}
			/>
		))
	}

	return (
		<div className="content p-40">
			<SliderSlick />
			<div className="items-header d-flex align-center justify-between mb-40">
				{searchValue ? (
					<h1 className="text-truncate">
						Поиск по запросу: <br /> {searchValue}
					</h1>
				) : (
					<h1>Все кроссовки</h1>
				)}
				<div className="search-block d-flex">
					<img src="img/search.svg" alt="Search" />
					{searchValue && (
						<img
							className="clear opacity-5 cu-p"
							onClick={() => setSearchValue("")}
							width={13}
							src="img/btn-close.svg"
							alt="Очистить"
						/>
					)}
					<input
						onChange={onChangeSearchInput}
						value={searchValue}
						placeholder="Поиск"
					/>
				</div>
			</div>
			<div className="cards-wrapper d-flex flex-wrap">{renderItems()}</div>
		</div>
	)
}

export default Home
