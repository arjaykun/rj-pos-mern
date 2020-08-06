import React from 'react';

const AlertMessage = ({messages}) => {
	return (
		<div 
			className={`text-base p-2 bg-${messages.error ? 'red' : 'green'}-500 rounded-lg my-2`}
		>
			{messages.message}
		</div>
	)
}

export default AlertMessage