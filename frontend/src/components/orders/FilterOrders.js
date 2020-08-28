import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";

const FilterOrders = ({change_url, hideModal}) => {
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [search, setSearch] = useState('')

	const handleKeyPress = e => {
		if(e.key === "Enter") {
			filter()
		 	hideModal()
		}
	}

	const handleClick = () => {
		filter()
		hideModal()
	}

	const filter = () => {
		if(startDate.toString() === endDate.toString())
			change_url({
					page: 1, 
					search_by: "order_id",
					search: search,
			})
		else
			change_url({
					page: 1, 
					start: moment(startDate).format('YYYY-MM-DD'),
					end: moment(endDate).format('YYYY-MM-DD'),
					search_by: "order_id",
					search: search,
			})
	}

	return (
		<div onKeyPress={handleKeyPress} >
			<h1 className="text-2xl font-bold uppercase pb-2">
				Filter Orders
			</h1>

			<div className="flex items-center justify-center mb-2">

				<div className="pr-1">
					<span className="uppercase font-bold block text-sm text-gray-700">Start Date</span>
					<DatePicker
			      selected={startDate}
			      onChange={date => setStartDate(date)}
			      className="w-full block border my-1 rounded-lg border-gray-500 p-2 cursor-pointer"
		    	/>
	    	</div>
	    	
	    	<div className="pl-1">
		    	<span className="uppercase font-bold block text-sm text-gray-700">End Date</span>
		    	<DatePicker
			      selected={endDate}
			      onChange={date => setEndDate(date)}
			      className="w-full block border my-1 rounded-lg border-gray-500 p-2 cursor-pointer"
		    	/>

	    	</div>
    	</div>

    	<span className="uppercase font-bold block text-sm text-gray-700">Search</span>
    	<input 
    		type="text" 
    		className="bg-gray-200 border border-gray-200 w-full text-base rounded-lg p-2 mb-2 text-gray-700 appearance-none focus:outline-none focus:bg-white"
    		placeholder="Search by Order I.D."
    		value={search}
    		onChange={ e => setSearch( e.target.value ) }
    	/>

    	<button 
				className="rounded-lg w-full p-2 text-gray-100 mb-4 bg-red-700 hover:bg-red-500"
				onClick={ handleClick }
			>
					Filter 
			</button>


		</div>
	)
}

export default FilterOrders