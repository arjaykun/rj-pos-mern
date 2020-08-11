import React from 'react';

const CategoryList = ({category, selectCategory}) => {
	return (
		<div
		 className={`w-24 h-12 uppercase font-bold text-xs ${category.color === 'black' ? 'bg-gray-800' : `bg-${category.color}-800`} text-white flex justify-center items-center flex-grow cursor-pointer hover:bg-${category.color === 'black'? 'gray': category.color}-500`}
		 onClick={() => selectCategory(category._id)}
		 key={category._id}
		 >
		 	{category.name}

		</div>
	)
}

export default CategoryList