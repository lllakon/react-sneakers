import Card from "../components/Card"

const Home = ({
	items,
	cartItems,
	searchValue,
	setSearchValue,
	onChangeSearchInput,
	onAddToCart,
	isLoading,
}) => {
	function renderItems() {
		const loadingArray = [
			{id: -1},
			{id: -2},
			{id: -3},
			{id: -4},
			{id: -5},
			{id: -6},
			{id: -7},
			{id: -8},
			{id: -9},
			{id: -10},
			{id: -11},
			{id: -12},
		]
		return (
			isLoading
				? loadingArray
				: items.filter((item) =>
						item.name.toLowerCase().includes(searchValue.toLowerCase())
				  )
		).map((item) => (
			<Card
				key={item.id}
				cartAdded={cartItems.some((obj) => Number(obj.id) === Number(item.id))}
				onPlus={(obj) => onAddToCart(obj)}
				{...item}
				isLoading={isLoading}
			/>
		))
	}

	return (
		<div className="content p-40">
			<div className="d-flex align-center justify-between mb-40">
				{searchValue ? (
					<h1 className="text-truncate">
						Поиск по запросу: <br /> {searchValue}
					</h1>
				) : (
					<h1>Все кроссовки</h1>
				)}
				<div className="search-block d-flex">
					<img src="/img/search.svg" alt="Search" />
					{searchValue && (
						<img
							className="clear opacity-5 cu-p"
							onClick={() => setSearchValue("")}
							width={13}
							src="/img/btn-close.svg"
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
			<div className="d-flex flex-wrap">{renderItems()}</div>
		</div>
	)
}

export default Home
