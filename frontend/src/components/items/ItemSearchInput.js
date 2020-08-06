import React, {useState, Fragment} from 'react';
import { MdSearch } from "react-icons/md"; 

const ItemSearchInput = ({searchItem}) => {
	const [search, setSearch] = useState('')

	const handleInput = (e) => {
		if(e.key === 'Enter')
			searchItem("http://localhost:8000/items?limit=10&page=1&search_by=name&search="+ search)
	}

	return (
		<Fragment>
			<div className="py-2 relative z-0">
				<input 
					type="text"
					className="bg-gray-200 border border-gray-200 w-full text-base rounded-lg p-2 focus:bg-white"
					placeholder="Search item" 
					value={search}
					onChange={ (e) => setSearch(e.target.value)  }
					onKeyPress={handleInput}
				/>
				<span className="absolute top-0 right-0 text-2xl mt-4 mr-2 text-gray-700"><MdSearch /></span>
			</div>
		</Fragment>
	)
}

export default ItemSearchInput