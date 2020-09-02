import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { getUsers, change_url } from '../actions/users'
import Modal from '../components/utils/Modal';
import Loading from '../components/utils/Loading';
import AlertMessage from '../components/utils/AlertMessage';
import Pagination from '../components/utils/Pagination';
import UserForm from '../components/users/UserForm';
import { FaChevronCircleRight, FaSortUp, FaSortDown } from 'react-icons/fa';

const Users = ({ getUsers, users, change_url }) => {
	const {page, limit, search_by, search, sort_by, asc} = users.queries
	const [showModal, setShowModal] = useState(false);
	const [sortNameAsc, setSortNameAsc] = useState(true);

	useEffect( () => {
		getUsers(`/users?page=${page}&limit=${limit}&search_by=${search_by}&search=${search}&sort_by=${sort_by}&asc=${asc}`)
		//eslint-disable-next-line
	}, [users.queries])

	const handleAdd = () => {
		setShowModal(true)
	}

	const handleNameSort = () => {
		setSortNameAsc(prevState => !prevState)
		change_url({asc: sortNameAsc? -1 : 1})
	}

	return (
		<div className="px-2">
			<Modal show={showModal} hideModal={() => setShowModal(false)} >
				<UserForm 
					operation={"add"} 
					loading={users.loading} 
					hideModal={() => setShowModal(false)}
					// categoryData={category}
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

			<table className="table-auto w-full">
				
				<thead>
					<tr className="bg-red-200 text-sm text-left uppercase">
						<th 
							className="font-bolder p-2 text-left flex items-center cursor-pointer" 
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
						<th className="font-bolder p-2 text-left">E-mail</th>
						<th className="font-bolder p-2 text-left">Position</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{
						users.users.map( (user, index) => (
							<tr key={user._id} className={`${index%2 !== 0? 'bg-gray-200' : null} text-sm`}>
								<td className="py-2">{user.name}</td>
								<td className="py-2">{user.email}</td>
								<td className="py-2">{user.userType}</td>
								<td className="py-2 cursor-pointer">
									<FaChevronCircleRight />
								</td>
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
})
export default connect(mapStateToProps, {getUsers, change_url})(Users)