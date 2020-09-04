import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Modal from '../components/utils/Modal';
import Confirmation from '../components/utils/Confirmation';
import Loading from '../components/utils/Loading';
import CategoryForm from '../components/categories/CategoryForm';
import CategoryDetail from '../components/categories/CategoryDetail';
import AlertMessage from '../components/utils/AlertMessage';
import { getCategories, deleteCategory } from '../actions/categories';
import { clear_message } from '../actions/messages';

const Categories = ({categories, loading, getCategories, deleteCategory, clear_message, messages}) => {

	const [ showModal, setShowModal ] = useState(false)
	const [ showConfirmModal, setShowConfirmModal ] =  useState(false)
	const [ category, setCategory ] = useState({ _id: '', name: '', color: ''})
	const [ operation, setOperation ] = useState('add')

	useEffect( () => {
		getCategories()

		//eslint-disable-next-line
	}, []) 

	const handleAdd = () => {
		hideMessage()
		setCategory({ _id: '', name: '', color: ''})
		setOperation("add")
		setShowModal(true)	
	}

	const handleUpdate = data => {
		hideMessage()
		setCategory(data)
		setOperation("edit")
		setShowModal(true)
	}

	const handleDelete = data => {
		setCategory(data)
		setShowConfirmModal(true)
	}

	const hideModal = () => {
		setShowModal(false);
		if(messages.error)
			clear_message();
	} 

	const hideMessage = () =>{
			if(messages.message)
				clear_message();
		}

	return (
		<div className="px-2">	
			<Modal show={showModal} hideModal={hideModal} >
				<CategoryForm 
					operation={operation} 
					loading={loading} 
					hideModal={hideModal}
					categoryData={category}
				 />
			</Modal>

			<Modal show={showConfirmModal} hideModal={ ()=>setShowConfirmModal(false) } >
				<Confirmation 
					title="Delete Category"
					text={`Are you sure you want to delete this category?`}
					yes={ deleteCategory }
					data={category._id}
					loading={loading} 
					no={ () => setShowConfirmModal(false) }
				/>
			</Modal>

			{ loading ? <Loading /> : null}		
			<div 
				className="py-2 px-2 mt-5 mb-2 flex justify-between items-center border-b border-t border-red-900"
			>
				<span className="text-xl uppercase font-bold">Category List</span>
				<div>
					<button
						className="bg-gray-800 p-2 rounded-lg text-gray-100 hover:bg-gray-700"
						onClick={ handleAdd }
					>
						Add Category
					</button>
				</div>
			</div>

			{ messages.message ? 
				<AlertMessage messages={messages} /> : null
			}

			{
				categories.map( category => (
					<CategoryDetail 
						category={category} 
						key={category._id} 
						deleteCategory={handleDelete}
						updateCategory={handleUpdate}
					/>
				))
			}
		</div>
	)
}

const mapStateToProps = state => ({
	categories: state.categories.categories,
	loading: state.categories.loading,
	messages: state.messages,
})

export default connect(mapStateToProps, {getCategories, deleteCategory, clear_message})(Categories)