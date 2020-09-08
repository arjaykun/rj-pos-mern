import React from 'react'
import { FaChevronCircleRight } from 'react-icons/fa';
import moment from 'moment';

const OrderRow = ({order, showOrder}) => {
	return (
		<tr className="" key={order._id}>
			<td className="py-2">{ moment(order.createdAt).format('MM/DD/YY hh:mm A')}</td>
			<td className="py-2">{order.order_id}</td>
			<td className="py-2">&#8369; {order.total}</td>
			<td className="py-2" onClick={ () => showOrder() }>	
					<FaChevronCircleRight />
			</td>
		</tr>
	)
} 

export default OrderRow