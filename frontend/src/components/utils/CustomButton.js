import React from 'react';

const CustomButton = ({type, classes, color, block, onClick, children, ...rest}) => {
	return (
		<button 
			type={type} 
			className={`
				btn flex items-center justify-center 
				bg-${color}-700 hover:bg-${color}y-600 
				${block ? 'w-full': null}
				${classes}
			`}
			onClick={onClick}
			{...rest}
		>
			{ children }
		</button>
	)
}

export default CustomButton