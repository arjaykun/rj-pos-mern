import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import ItemDetail from '../components/items/ItemDetail';
import Modal from '../components/utils/Modal';
import ItemForm from '../components/items/ItemForm';
import ItemSearchInput from '../components/items/ItemSearchInput';
import Confirmation from '../components/utils/Confirmation';
import { getItems, addItem, deleteItem, updateItem, change_url } from '../actions/items';
import { clear_message } from '../actions/messages';
import Loading from '../components/utils/Loading';
import AlertMessage from '../components/utils/AlertMessage';

const url_base = "http://localhost:8000"

const Items = ({items, messages, getItems, addItem, deleteItem, updateItem, clear_message, change_url}) => {

	const [showModal, setShowModal] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [operation, setOperation] = useState('add');
	const [action, setAction] = useState(null)
	const [item, setItem] = useState({ name: '', price: '', category: ''})
	const {page, limit, search_by, search} = items.queries
	// const [url, setUrl] =  useState(`${url_base}/items?page=${page}&limit=${limit}`)

	// useEffect( () => {
	// 	if(items.count === 0) {
	// 		getItems(`${url_base}/items`);
	// 	}
	// 	//eslint-disable-next-line
	// }, [])

	useEffect( () => {
		getItems(`${url_base}/items?page=${page}&limit=${limit}&search_by=${search_by}&search=${search}`)
		 // eslint-disable-next-line
	}, [items.queries])


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

			{ 
				items.loading ? 
 					<Loading />
				:
				<div className="px-2">				
			
					<div 
						className="py-2 px-2 mt-5 mb-2 flex justify-between items-center border-b border-t border-red-900"
					>
						<span className="text-xl uppercase font-bold">Item List</span>
						<button
							className="bg-gray-800 p-2 rounded-lg text-gray-100 hover:bg-gray-700"
							onClick={ handleAdd }
						>
							Add Item
						</button>
					</div>

					<ItemSearchInput 
						searchItem={change_url} 
						searchText={search} 
						clearSearch={ () => change_url({search_by:'', search:''})} 
					/>
				
					{ messages.message && !messages.error ? <AlertMessage messages={messages} /> : ''}

					{  
						items.count > 0 ?
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

					<div className="flex justify-center items-center">
						<button 
							className={`bg-${!items.prevPage? 'gray' : 'red'}-500 mx-2 p-2 rounded-lg text-white text-sm`}
							disabled={!items.prevPage}
							onClick={ () => change_url({page: items.page - 1 }) }
						>
							previous
						</button>
						<div className="text-base tracking-wider">
							page { items.page } of { items.totalPages }
						</div>
						<button 
							className={`bg-${!items.nextPage? 'gray' : 'red'}-500 mx-2 p-2 rounded-lg text-white text-sm`}
							disabled={!items.nextPage}
							onClick={ () => change_url({page: items.page + 1 }) }
						>
							next
						</button>
					</div>

				</div>
			}
		</div>
	)
}

const mapStateToProps = state => ({
	items: state.items,
	messages: state.messages
})

const mapDispatchToProps = {
	getItems, addItem, deleteItem, updateItem, clear_message, change_url
}

export default connect(mapStateToProps, mapDispatchToProps)(Items)