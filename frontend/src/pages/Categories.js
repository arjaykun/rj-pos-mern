import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Modal from '../components/utils/Modal';
import Confirmation from '../components/utils/Confirmation';
import Loading from '../components/utils/Loading';
import CategoryForm from '../components/categories/CategoryForm';
import CategoryDetail from '../components/categories/CategoryDetail';
import { getCategories, deleteCategory } from '../actions/categories';

const Categories = ({categories, loading, getCategories, deleteCategory}) => {

	const [ showModal, setShowModal ] = useState(false)
	const [ showConfirmModal, setShowConfirmModal ] =  useState(false)
	const [ category, setCategory ] = useState({ _id: '', name: '', color: ''})

	useEffect( () => {
		getCategories()

		//eslint-disable-next-line
	}, []) 

	const handleDelete = data => {
		setCategory(data)
		setShowConfirmModal(true)
	}

	return (
		<div className="px-2">	
			<Modal show={showModal} hideModal={ () => setShowModal(false) } >
				<CategoryForm operation={"add"} loading={loading} hideModal={ () => setShowModal(false) } />
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
						onClick={ () => setShowModal(true) }
					>
						Add Category
					</button>
				</div>
			</div>

			{
				categories.map( category => (
					<CategoryDetail 
						category={category} 
						key={category._id} 
						deleteCategory={handleDelete}
					/>
				))
			}
		</div>
	)
}

const mapStateToProps = state => ({
	categories: state.categories.categories,
	loading: state.categories.loading,
})

export default connect(mapStateToProps, {getCategories, deleteCategory})(Categories)