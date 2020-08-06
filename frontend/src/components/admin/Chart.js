import React from 'react';
import {Line} from 'react-chartjs-2';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Monthly Sales',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      pointBorderWidth: 1,
      pointHoverRadius: 15,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [650, 590, 808, 1810, 1565, 550, 140]
    }
  ]
};

const Chart = () => {
		

	return (
		<div className="bg-gray-100 w-full h-64 rounded-lg">
			 <Line data={data} 
  options={{ maintainAspectRatio: false }} />
		</div>
	)
}

export default Chart