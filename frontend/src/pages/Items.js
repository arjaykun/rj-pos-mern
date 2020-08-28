import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import ItemDetail from '../components/items/ItemDetail';
import Modal from '../components/utils/Modal';
import ItemForm from '../components/items/ItemForm';
import ItemSearchInput from '../components/items/ItemSearchInput';
import Confirmation from '../components/utils/Confirmation';
import { getItems, addItem, deleteItem, updateItem, change_url } from '../actions/items'
import { getCategories } from '../actions/categories';
import { clear_message } from '../actions/messages';
import Loading from '../components/utils/Loading';
import AlertMessage from '../components/utils/AlertMessage';
import Pagination from '../components/utils/Pagination';


const Items = ({items, messages, getItems, addItem, deleteItem, updateItem, clear_message, change_url, categories, getCategories}) => {

	const [showModal, setShowModal] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [operation, setOperation] = useState('add');
	const [action, setAction] = useState(null)
	const [item, setItem] = useState({ name: '', price: '', category: ''})
	const {page, limit, search_by, search} = items.queries

	useEffect( () => {
			getItems(`/items?page=${page}&limit=${limit}&search_by=${search_by}&search=${search}`)
		 // eslint-disable-next-line
	}, [items.queries])

	useEffect( ()=> {
		if(categories.categories.length === 0)
			getCategories()
		 // eslint-disable-next-line
	}, [])


	const handleAdd = () => {
		setAction(() => addItem);
		setOperation('add');
		setShowModal(true);
	}

	const handleEdit = data => {
		setAction(() => updateItem);
		setItem(data);
		setOperation('edit');
		setShowModal(true);
	}

	const hideModal = () => {
		setItem({ name: '', price: '', category: ''})
		setShowModal(false);
		if(messages.message)
			clear_message();
	} 

	const handleDelete = data=> {
		setOperation('delete')
		setItem(data);
		setShowConfirmModal(true)
	}

	return (
		<div>
			<Modal show={showModal} hideModal={ hideModal } >
				<ItemForm 
					operation={operation} 
					action={action} 
					loading={items.loading} 
					hideModal={ hideModal} 
					itemData={item}
					categories={categories.categories}
					getCategories={getCategories}
					messages={messages}
				/>
			</Modal>

			<Modal show={showConfirmModal} hideModal={ ()=>setShowConfirmModal(false) } >
				<Confirmation 
					title="Delete items"
					text={`Are you sure you want to delete this item?`}
					yes={ deleteItem }
					data={item._id}
					loading={items.loading} 
					no={ () => setShowConfirmModal(false) }
				/>
			</Modal>

			{ items.loading && categories.loading ? <Loading /> : null}
			
			<div className="px-2">				
				<div 
					className="py-2 px-2 mt-5 mb-2 flex justify-between items-center border-b border-t border-red-900"
				>
					<span className="text-xl uppercase font-bold">Item List</span>
					<div>
						<button
							className="bg-green-800 p-2 rounded-lg text-gray-100 hover:bg-green-700"
						>
							Categories
						</button>
						<button
							className="bg-gray-800 p-2 rounded-lg text-gray-100 hover:bg-gray-700"
							onClick={ handleAdd }
						>
							Add Item
						</button>
					</div>
				</div>

				<ItemSearchInput 
					searchItem={change_url} 
					searchText={search} 
					clearSearch={ () => change_url({search_by:'', search:''})} 
				/>
			
				{ messages.message && !messages.error ? <AlertMessage messages={messages} /> : ''}

				{  
					items.items.length > 0 ?
						items.items.map( item => (
						 	<ItemDetail 
						 		item={item} 
						 		key={item._id} 
						 		deleteItem={handleDelete}  
						 		editItem={handleEdit}
						 	/>
						 ))
						:
						<div className="text-center text-4xl bg-gray-200 py-5 font-bold">No Item</div>
				}

				<Pagination data={items} change_url={change_url} />
				
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
	items: state.items,
	messages: state.messages,
	categories: state.categories,
})

const mapDispatchToProps = {
	getItems, addItem, deleteItem, updateItem, clear_message, change_url, getCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(Items)