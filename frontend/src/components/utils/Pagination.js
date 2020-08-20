import React from 'react';

const Pagination = ({data, change_url}) => {

	const handleChange = e => {
		change_url({page:e.target.value})
	}

	const pages = () => {
		let output = [];
		for( let i = 1; i <= data.totalPages; i++) {
			output.push(i)
		}
		return output;
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
				<select
					className="border w-12 px-1 bg-red-100"
					onChange={handleChange}
					value={data.page}
				>
					{
						pages().map( num => (
							<option value={num}>{num}</option>
						))
					}

				</select>
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