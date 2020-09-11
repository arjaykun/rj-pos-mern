import React from 'react';
import {Line} from 'react-chartjs-2';


const Chart = ({labels, data, title}) => {
	 
  const config = {
    labels: labels,
    datasets: [
	    {
		    label: title,
		    fill: false,
		    lineTension: 0.1,
		    backgroundColor: '#f56565',
		    borderColor: '#f56565',
		    pointBorderWidth: 1,
		    pointHoverRadius: 15,
		    pointHoverBackgroundColor: '#f56565',
		    pointHoverBorderColor: '#f56565',
		    pointHoverBorderWidth: 2,
		    pointRadius: 1,
		    pointHitRadius: 10,
		    data: data
	    }
   	]
  } 

	return (
		<div className="bg-gray-100 w-full h-64 rounded-lg">
			 <Line data={config} 
  options={{ maintainAspectRatio: false }} />
		</div>
	)
}

export default Chart