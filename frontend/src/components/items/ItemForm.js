import React, { useState, useEffect, useRef } from 'react';
import { MdSave } from "react-icons/md";
import AlertMessage from '../utils/AlertMessage';

const ItemForm = ({operation, action, loading, hideModal, itemData, messages, categories}) => {
		
	const [item, setItem] = useState({name:'', price: '', category: ''});
	const inputRef = useRef();
	

	useEffect( ()=> {
		if(!loading && !messages.error) 
			hideModal()
			//eslint-disable-next-line
	}, [loading])

	useEffect( () => {	
		setItem(itemData)
		inputRef.current.focus();
	}, [itemData])


	const handleSubmit = e => {
		e.preventDefault()

		action(item)
	}

	const handleChange = e => {
		e.persist();
		setItem( prevItem => ({ ...prevItem, [e.target.name]:e.target.value }) )
	}
 
	return (
		<div>
			<h1 className="text-xl pb-3 text-gray-700">
				{ operation === 'add'? 'Add New Item' : 'Edit Item'}
			</h1>
			{ messages.error ? <AlertMessage messages={messages} /> : null}
			<form className="py-3" onSubmit={handleSubmit}>

				<label className="mb-2 block uppercase tracking-wide text-gray-700 text-xs font-bold">
					Name
				</label>
				<input 
					type="text"
					className="bg-gray-200 border border-gray-200 w-full text-base rounded-lg p-2 mb-4 text-gray-700 appearance-none focus:outline-none focus:bg-white"
					placeholder="Item Name"
					value={item.name}
					name="name"
					onChange={handleChange} 
					ref={inputRef}
				/>

				<label className="mb-2 block uppercase tracking-wide text-gray-700 text-xs font-bold">
					Price
				</label>
				<input 
					type="text"
					className="bg-gray-200 border border-gray-200 w-full text-base rounded-lg p-2 mb-4 text-gray-700 appearance-none focus:outline-none focus:bg-white"				
					placeholder="Item Price"
					value={item.price}
					name="price"
					onChange={handleChange} 
				/>

				<label className="mb-2 block uppercase tracking-wide text-gray-700 text-xs font-bold">
					Category
				</label>
				<div className="relative mb-3">
	        <select 
	        	className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-2 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
	        	value={item.category}
						name="category"
						onChange={handleChange} 
	        >
	        	<option disabled value="">Select Category</option>
	          {
	          	categories.map( category => (
	          		<option value={category.name} key={category._id}>{category.name}</option>
	          	))
	          }
	        </select>
	        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
	          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
	        </div>
	      </div>

				<button 
					className={`rounded-lg w-full p-2 text-gray-100 mb-4 ${loading? 'bg-gray-500' : 'bg-red-700 hover:bg-red-500 '}`}
					type="submit"
					disabled={loading}
					>
						<span  className="w-full flex justify-center"><MdSave /></span> 
				</button>

			</form>
		</div>
	)
}

export default ItemForm