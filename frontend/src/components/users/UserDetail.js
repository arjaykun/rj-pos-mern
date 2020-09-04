import React, { Fragment } from 'react'
import { MdModeEdit, MdDelete} from 'react-icons/md'
const UserDetail = ({user, index, deleteUser, updateUser, DropdownComponent, dropdown, showDropdown}) => {

	return (
		<Fragment>
			<td className="py-2">{user.name} ({user.userType})</td>
			<td className="py-2">{user.email}</td>
			<td className="py-2 flex justify-center items-center">
				<MdModeEdit 
					className="text-blue-600 cursor-pointer" 
					onClick={() => updateUser(user)}
				/> 
				<MdDelete 
					className="text-red-600 cursor-pointer" 
					onClick={() => deleteUser(user)} 
				/>
			</td>
		</Fragment>
	)
}

export default UserDetail
