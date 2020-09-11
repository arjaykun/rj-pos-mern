import React, {useState, useEffect} from 'react';
import { MdSave } from "react-icons/md";
import AlertMessage from '../utils/AlertMessage';
import { connect } from 'react-redux';
import { addCategory, updateCategory } from '../../actions/categories';

const colors = ['red', 'green', 'yellow', 'blue', 'gray', 'teal', 'indigo', 'purple', 'pink', 'orange'];

const CategoryForm = ({operation, loading, addCategory, messages, hideModal, categoryData, updateCategory}) => {

	const [ category, setCategory ] = useState({ _id: '', name: '', color: ''})

	useEffect( () => {
		setCategory(categoryData)
	}, [categoryData])

	useEffect( () => {
		if(!loading && !messages.error) 
			hideModal()

		//eslint-disable-next-line
	}, [loading])

	const handleSubmit = e => {
		e.preventDefault()
		if(operation === 'add')
			addCategory(category);
		else if(operation === 'edit')
			updateCategory(category)
	}

	const handleChange = e => {
		e.persist();
		setCategory( prevItem => ({ ...prevItem, [e.target.name]:e.target.value }) )
	}

	return (
		<div
	>		<h1 className="text-xl pb-3 text-gray-700">
				{ operation === 'add'? 'Add New Category' : 'Edit Category'}
			</h1>
			{ messages && messages.error ? <AlertMessage messages={messages} /> : null }
			<form className="py-3" onSubmit={handleSubmit}>

				{/* name field */}
				<label className="mb-2 block uppercase tracking-wide text-gray-700 text-xs font-bold">
					Name
				</label>
				<input 
					type="text"
					className="bg-gray-200 border border-gray-200 w-full text-base rounded-lg p-2 mb-4 text-gray-700 appearance-none focus:outline-none focus:bg-white"
					placeholder="Category Name"
					value={category.name}
					name="name"
					onChange={handleChange} 
				/>

	     	{/* color radio button */}
	     	<label className="mb-2 block uppercase tracking-wide text-gray-700 text-xs font-bold">
					Select Color Theme
				</label>
	     	<div className="flex flex-wrap items-center justify-start mb-2">
	     	{
        	colors.map( (color, i) => (
	        	<label key={i} className={` w-12 h-12 bg-${color}-600 rounded-lg border-2 border-white hover:bg-${color}-500 ${category.color === color? `border-${color}-700` : ''}`}>
			     	 <input 
			     	 	type="radio" 
			     	 	value={color}
			     	 	className="appearance-none hidden"
			     	 	name="color"
							onChange={handleChange} 
						/>
			     </label>
        	))
	       }
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

const mapStateToProps = state => ({
	messages: state.messages
})

export default connect(mapStateToProps, { addCategory, updateCategory })(CategoryForm)