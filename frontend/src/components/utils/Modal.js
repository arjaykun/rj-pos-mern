import React from 'react';

const Modal = ({show, hideModal, children}) => {
	return (
		<div 
			className={`
					inset-0 fixed h-full w-full flex justify-center items-center z-20
					${ show? 'block' : 'hidden'}
				`}>
			
			{/*overlay*/}
			<div className="bg-black opacity-75 absolute inset-0 w-full h-full z-20"></div>

			<div className={`
				bg-white p-3 w-108 h-auto z-30 rounded-lg relative
			`}>
				
				{children}


				{/*close icon*/}
				<button 
					className="text-3xl text-gray-700 absolute top-0 right-0 mr-3 focus:outline-none opacity-75 hover:opacity-100"
					onClick={hideModal}
				>
					&times;
				</button>

			</div>


		</div>
	)
}

export default Modal