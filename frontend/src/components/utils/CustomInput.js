import React, { Fragment } from 'react';

const CustomInput = ({type, placeholder, onChange, value, name, classes, ...rest}) => {
	return (
		<Fragment>
			<input 
				type={type}
				className={ `bg-gray-200 border border-gray-200 w-full text-base rounded-lg p-2 mb-4 text-gray-700 appearance-none focus:outline-none focus:bg-white ${classes}`}
				placeholder={placeholder}
				value={value}
				name={name}
				onChange={onChange} 
				{...rest}
			/>
		</Fragment>
	)
}

export default CustomInput;