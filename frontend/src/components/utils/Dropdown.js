import React, {useState} from 'react'
import {FaChevronCircleRight} from 'react-icons/fa'

const Dropdown = ({show}) => {
	
	const _class = "block w-full px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"

	return (
		<div 
			className="relative inline-block " 
		>
 			<FaChevronCircleRight />

 			{
 				show ? 
 				<div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg transition duration-1000 delay-1000">
			    <div className="rounded-md bg-white shadow-xs">
			      <div className="py-1">
			        <button className={_class}>
			        	Account settings
			        </button>
			        <button 
			        	className={_class}>Support
			        </button>
			        <button 
			        	className={_class}>License
			        </button>
			      </div>
			    </div>
			  </div> :
			  null
 			}
		  
			  
		</div>
	)
}
 

export default Dropdown