import React, {useState} from 'react';

const Pagination = ({data, change_url}) => {

	const [ page, setPage ] = useState(data.page)

	const handleChange = e => {
		setPage(e.target.value)
	}

	const handleKeyPress = e => {
		if(e.key === "Enter")
			change_url({ page })
	}

	return (

		<div className="flex justify-center items-center py-3">
			<button 
				className={`bg-${!data.prevPage? 'gray' : 'red'}-500 mx-2 p-2 rounded-lg text-white text-sm`}
				disabled={!data.prevPage}
				onClick={ () => change_url({page: data.page - 1 }) }
			>
				previous
			</button>
			<div className="text-base tracking-wider">
				page 
				<input 
					className="border w-8 px-1 bg-red-100"
					onChange={handleChange}
					onKeyPress={handleKeyPress}
					value={page}
				/>
				of { data.totalPages }
			</div>
			<button 
				className={`bg-${!data.nextPage? 'gray' : 'red'}-500 mx-2 p-2 rounded-lg text-white text-sm`}
				disabled={!data.nextPage}
				onClick={ () => change_url({page: data.page + 1 }) }
			>
				next
			</button>
		</div>

	)
}

export default Pagination