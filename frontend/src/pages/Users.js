import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { getUsers, change_url, deleteUser } from '../actions/users'
import { clear_message } from '../actions/messages'
import Modal from '../components/utils/Modal';
import Confirmation from '../components/utils/Confirmation';
import Loading from '../components/utils/Loading';
import AlertMessage from '../components/utils/AlertMessage';
import Pagination from '../components/utils/Pagination';
import UserForm from '../components/users/UserForm';
import UserDetail from '../components/users/UserDetail';
import { FaSortUp, FaSortDown } from 'react-icons/fa';

const initialUser = { _id: '', name: '', email:'', userType: 'user', password: ''}
const Users = ({ getUsers, users, change_url, messages, clear_message, deleteUser}) => {
	
	const {page, limit, search_by, search, sort_by, asc} = users.queries
	const [showModal, setShowModal] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [sortNameAsc, setSortNameAsc] = useState(true);
	const [user, setUser] = useState(initialUser)
	const [ operation, setOperation ] = useState('add')

	useEffect( () => {
		getUsers(`/users?page=${page}&limit=${limit}&search_by=${search_by}&search=${search}&sort_by=${sort_by}&asc=${asc}`)
		//eslint-disable-next-line
	}, [users.queries])

	const handleAdd = () => {
		hideMessage()
		setUser(initialUser)
		setOperation("add")
		setShowModal(true)
	}

	const handleNameSort = () => {
		setSortNameAsc(prevState => !prevState)
		change_url({asc: sortNameAsc? -1 : 1})
	}

	const hideModal = () => {
		setShowModal(false);
		if(messages.error)
			clear_message();
	}

	const handleDelete = data => {
		setUser(data)
		setShowConfirmModal(true)
	} 

	const handleUpdate = data=> {
		hideMessage()
		setUser(data)
		setOperation("edit")
		setShowModal(true)
	}

	const hideMessage = () =>{
		if(messages.message)
			clear_message();
	}

	return (
		<div className="px-2">
			<Modal show={showModal} hideModal={hideModal} >
				<UserForm 
					operation={operation} 
					loading={users.loading} 
					hideModal={hideModal}
					messages={messages}
					userData={user}
				 />
			</Modal>

			<Modal show={showConfirmModal} hideModal={ ()=>setShowConfirmModal(false) } >
				<Confirmation 
					title="Delete User"
					text={`Are you sure you want to delete this user?`}
					yes={ deleteUser }
					data={user._id}
					loading={users.loading} 
					no={ () => setShowConfirmModal(false) }
				/>
			</Modal>

			{ users.loading ? <Loading /> : null}
			
			<div>				
				<div 
					className="py-2 px-2 mt-5 mb-2 flex justify-between items-center border-b border-t border-red-900"
				>
					<span className="text-xl uppercase font-bold">User List</span>
					<div>
						<button
							className="bg-gray-800 p-2 rounded-lg text-gray-100 hover:bg-gray-700"
							 onClick={ handleAdd }
						>
							Add User
						</button>
					</div>
				</div>
			</div>

			{ messages.message ? 
				<AlertMessage messages={messages} /> : null
			}

			<table className="table-fixed w-full">
				
				<thead>
					<tr className="bg-red-200 text-sm text-left uppercase">
						<th 
							className="font-bolder p-2 text-left flex items-center cursor-pointer w-5/12" 
							onClick={handleNameSort}
						>
							Name
							{
								sortNameAsc ?
									<FaSortUp className="ml-2" /> 
								:
								 <FaSortDown className="ml-2" /> 
							}
							
						</th>
						<th className="font-bolder p-2 text-left w-5/12">E-mail</th>
						<th className="w-2/12"></th>
					</tr>
				</thead>
				<tbody>
					{
						users.users.map( (user, index) => (
							<tr 
								key={user._id} 
								className={`${index%2 !== 0? 'bg-gray-200' : null} text-sm`}
							>
								<UserDetail 
									user={user}
									key={user._id} 
									index={index} 
									deleteUser={handleDelete}
									updateUser={handleUpdate}
								/>
							</tr>
						))
					}
				</tbody>

			</table>

			<Pagination data={users} change_url={change_url} />			
		</div>
	)
}

const mapStateToProps = state => ({
	users: state.users,
	messages: state.messages,
})
export default connect(mapStateToProps, {getUsers, change_url, clear_message, deleteUser})(Users)