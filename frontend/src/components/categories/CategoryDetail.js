import React from 'react';
import { MdModeEdit, MdDelete, MdCheckCircle} from 'react-icons/md'

const CategoryDetail = ({category, deleteCategory}) => {
	return (
		<div 
			className={`bg-${category.color}-500 py-3 px-2 my-1 rounded-lg flex items-center justify-between`}
		>
			<h1 className="font-extrabold uppercase text-gray-100 text-base flex items-center"> 
			{category.name}
			{ category.isNew? <MdCheckCircle className="ml-2 text-gray-100" /> : ""}
			</h1>

			<div className="flex justify-center items-center">
				<MdModeEdit 
					className="mr-1 text-xl text-blue-900 cursor-pointer"
					// onClick={ () => editItem(item) }
				/>
				<MdDelete 
					className="text-xl text-red-900 cursor-pointer"
				 	onClick={ () => deleteCategory(category) }
				/>
			</div>
		</div>
	)
}

export default CategoryDetail;