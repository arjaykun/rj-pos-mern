import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MdSave } from "react-icons/md";
import AlertMessage from '../utils/AlertMessage';
import CustomInput from '../utils/CustomInput';
import CustomButton from '../utils/CustomButton';

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
				<div className="flex justify-start items-center flex-wrap mb-2">
	        {
	        	categories.length > 0 ?
		          categories.map( category => (
			          <label key={category._id} className={`p-2 flex items-center justify-center bg-${category.color}-600 rounded-lg border-2 border-white hover:bg-${category.color}-500 ${item.category === category.name? `border-${category.color}-700` : null}`}>
			           <span className="text-gray-100 font-bold text-xs">{category.name}</span>
					     	 <input 
					     	 	type="radio" 
					     	 	value={category.name}
					     	 	className="appearance-none hidden"
					     	 	name="category"
									onChange={handleChange} 
								/>
					     </label>
		          ))
		        : <div className="text-gray-700 text-sm">No Categories added yet, 
		        		<span className="font-bold text-blue-800 cursor-pointer"><Link to="/admin/categories" > Add category.</Link></span>
		        	</div>
	         }
	      </div>

	      <CustomButton
	      	type="submit"
	      	color="red"
	      	disabled={loading}
	      	block
	      >
					<span  className="w-full flex justify-center uppercase items-center font-bold">
						<MdSave className="text-lg mr-1" /> Save Item
					</span> 
	      </CustomButton>



			</form>
		</div>
	)
}

export default ItemForm