import React from 'react';
import { MdModeEdit, MdDelete, MdCheckCircle } from 'react-icons/md'
const ItemDetail = ({item, deleteItem, editItem }) => {
	
	return (
		<div className="bg-gray-200 py-3 px-2 my-1 rounded-lg ">

			<div className="flex justify-between items-center">
				<h1 className="font-bold py-1 text-xl flex items-center">
					{item.name} 
					{ item.isNew? <MdCheckCircle className="ml-2 text-green-500" /> : ""}
				</h1>
				<div className="flex justify-center items-center">
					<MdModeEdit 
						className="mr-1 text-xl text-blue-500 cursor-pointer"
						onClick={ () => editItem(item) }
					/>
					<MdDelete 
						className="text-xl text-red-500 cursor-pointer"
						onClick={ () => deleteItem(item) }
					/>
				</div>
			</div>

			<div className="flex justify-between items-center">
				<div className="text-base  italic">
					{item.category}
				</div>
				<div className="text-red-900">P { item.price }</div>
			</div>
			
		</div>
	)
}

export default ItemDetail