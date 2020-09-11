import React from 'react';
import ReactLoading from 'react-loading';

const Loading = () => {
	return (
		<div className="fixed inset-0 w-full h-full flex justify-center items-center z-30">
			<ReactLoading type="spokes" color="#333" height={'120px'} width={'120px'} />
		</div>
	)
}
 
export default Loading