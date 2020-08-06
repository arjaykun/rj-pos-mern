import React from 'react';

const CategoryList = ({categories}) => {
	return (
		<div>
			<div className="mb-1 uppercase font-bold text-xs bg-gray-700 text-white rounded-lg h-10 flex justify-center items-center">
				all
			</div>
			{
				categories.map( (category, index) => (
					<div key={index} className="mb-1 uppercase font-bold text-xs bg-gray-700 text-white rounded-lg h-10 flex justify-center items-center">
						{ category }
					</div>
				))
			}
			
		</div>
	)
}

export default CategoryList