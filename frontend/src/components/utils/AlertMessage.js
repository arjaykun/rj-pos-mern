import React from 'react';
import {connect} from 'react-redux'
import {clear_message} from '../../actions/messages'
import { MdClose } from 'react-icons/md'
const AlertMessage = ({messages, clear_message}) => {
	const color = messages.error ? 'red' : 'green';

	return (
		<div 
			className={`
				text-base p-2 bg-${color}-500
			  my-2 py-3 text-gray-100
			 	border-l-8 border-${color}-700
			 	flex justify-between items-center
			`}
		>
			<div>
				<span className="font-bold">
					{ messages.error? 'Whoops! ' : "Success! "	}
				</span>
				{messages.message}
			</div>

			{/*close icon*/}
			<button 
				className="text-gray-700 focus:outline-none opacity-75 hover:opacity-100"
			>
				<MdClose className="text-gray-100" onClick={ () => clear_message() }/>
			</button>

		</div>
	)
}

export default connect(null, {clear_message})(AlertMessage)