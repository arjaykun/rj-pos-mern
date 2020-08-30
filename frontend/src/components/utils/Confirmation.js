import React from 'react';

const Confirmation = ({title, text, yes, no, data}) => {

	
	const handleYes = () => {
		yes(data);
		no();
	}

	return (
		<div className="text-gray-700"> 
			<h1 className="text-2xl font-bold uppercase">{title}</h1>
			<h1 className="text-base py-2 my-2 ">{text}</h1>
			<div className="flex justify-end items-center">

				<button 
					className="bg-red-700 px-5 py-1 text-white mx-1 rounded-lg uppercase font-bold text-base"
					onClick={ handleYes }
				>
					Yes
				</button>

				<button 
					className="bg-gray-300 px-5 py-1  mx-1 rounded-lg uppercase font-bold text-base"
					onClick={ () => no() }
				>
					No
				</button>

			</div>
		</div>
	)
}

export default Confirmation