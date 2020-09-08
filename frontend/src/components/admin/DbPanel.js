import React, {useState} from 'react';
import CountUp from 'react-countup';

const DbPanel = ({end, color, title, icon }) => {

	const [hover, setHover] = useState(false);

	return (
		<div 
			onMouseEnter={ () => setHover(true) }
			onMouseLeave={ () => setHover(false) }
			className={`bg-${color || 'red'}-500 overflow-hidden flex h-24 relative rounded-lg flex items-center hover:bg-${color}-400`}>
			<h1 className={`font-extrabold text-${color}-700 uppercase text-xs absolute top-0 pt-3 pl-3 z-10`}>
				{title}
			</h1>
			<span className="text-3xl font-bold text-white px-3">
					<CountUp end={end} decimal="," prefix="&#8369;" />
			</span>
			<span className={`absolute opacity-50 text-6xl transition-all duration-300 ease-in text-gray-200 top-0 right-0 mr-3 mt-3 transform ${ hover? 'scale-150' : ''} `}>
				{icon}
			</span>
		</div>
	)
}

export default DbPanel