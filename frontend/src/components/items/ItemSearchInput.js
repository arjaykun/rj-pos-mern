import React, {useState, Fragment} from 'react';
import { MdSearch } from "react-icons/md"; 

const ItemSearchInput = ({searchItem, searchText, clearSearch}) => {
	const [search, setSearch] = useState('')

	const handleInput = (e) => {
		if(e.key === 'Enter')
			searchItem({search_by: 'name', search, page: 1 })
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
			<div>
			{
				searchText ? 
					<div className="flex justify-between items-center">
						<span>Search Key: {searchText}</span>
						<button
							onClick={clearSearch}
						>Clear Search</button>
					</div>					
					:
					null
			}
			</div>
		</Fragment>
	)
}

export default ItemSearchInput