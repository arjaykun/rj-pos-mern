import React, {useState, useRef, useEffect} from 'react';
import { MdSearch } from "react-icons/md"; 
import {connect} from 'react-redux';
// import { searchItem } from '../../actions/shop';

const ShopSearch = ({hideModal, items, setItems, showSearch}) => {
	const inputRef = useRef();
	
	useEffect( ()=> {
		if(showSearch) {
			console.log('input ref')
			inputRef.current.focus()
		}
	}, [showSearch])

	const [search, setSearch] = useState('')
	const handleKeyPress = e => {
		if(e.key === 'Enter') {
			searchItem()
		}
	}

	const handleSearch = () => {
		searchItem()
	}

	const searchItem = () => {
		const filteredItems = items.filter( item => item.name.toLowerCase().includes(search.toLowerCase()))
		setItems(filteredItems)

		setSearch('')
		hideModal();
	}
	return (
		<div>
			<h1 className="text-2xl font-bold uppercase pb-2">Search Item By Name</h1>
			<div className="py-2 relative z-0">
				<input 
					type="text"
					className="bg-gray-200 border border-gray-200 w-full text-base rounded-lg p-2 focus:bg-white"
					placeholder="Search item" 
					value={search}
					onChange={ (e) => setSearch(e.target.value)  }
					onKeyPress={handleKeyPress}
					ref={inputRef}
				/>
				<span className="absolute top-0 right-0 text-2xl mt-4 mr-2 text-gray-700"><MdSearch onClick={handleSearch} /></span>
			</div>

			<div className="grid grid-cols-2 gap-2 items-center">
				<button 
					onClick={hideModal}
					className="block bg-gray-300 text-gray-700 py-2 rounded-lg">
					Close
				</button>
				<button 
					className="block bg-red-700 text-white py-2 rounded-lg"
					onClick={handleSearch }
				>
					Search
				</button>
			</div>

		</div>
	)
}
const mapStateToProps = state => ({
	items: state.shop.allItems,
})

export default connect(mapStateToProps)(ShopSearch)