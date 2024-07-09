import React, { useEffect, useState, useRef } from "react";
import { SelectInput } from "../FormComponents/FormComponents";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Orders({ ordersData }) {
	const [orders, setOrders] = useState(ordersData);
	const navigate = useNavigate();
	const trRef = useRef(null);
	const selectRef = useRef(null);

	useEffect(() => {
		setOrders(ordersData);
	}, [ordersData]);

	const statusArray = [
		{ label: "booked", value: "booked" },
		{ label: "under MW", value: "under MW" },
		{ label: "under stitching", value: "under stitching" },
		{ label: "finishing work", value: "finishing work" },
		{ label: "pending", value: "pending" },
		{ label: "delivered", value: "delivered" },
	];

	async function handleStatusChange(orderId, newStatus) {
		setOrders((prevOrders) => prevOrders.map((order) => (order._id === orderId ? { ...order, status: newStatus } : order)));

		try {
			const response = await axios.post(`${process.env.REACT_APP_BACKENDURI}/api/order/update-status`, {
				orderId,
				status: newStatus,
			});
			console.log(`Order ${orderId} status changed to ${newStatus}`, response.data);
		} catch (error) {
			console.error("Error updating order status", error);
		}
	}

	function handleDetailView(e, orderId) {
		if (selectRef.current && !selectRef.current.contains(e.target)) {
			navigate(`/order/${orderId}`);
		}
	}

	return (
		<>
			<table className="mt-2 main-table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Number</th>
						<th>Invoice</th>
						<th>Categories</th>
						<th>Total</th>
						<th>Advance</th>
						<th>Pending</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{orders.length >= 1 &&
						orders.map((order) => (
							<tr key={order._id} onClick={(e) => handleDetailView(e, order._id)} ref={trRef}>
								<td>{order.customer.name}</td>
								<td>{order.customer.number}</td>
								<td>{order.invoice}</td>
								<td>{order.categories}</td>
								<td>{order.price}</td>
								<td>{order.advance}</td>
								<td>{order.price - order.advance}</td>
								<td ref={selectRef}>
									<SelectInput options={statusArray} label="Status" id="status" name="status" defaultValue={order.status} onChange={(e) => handleStatusChange(order._id, e.target.value)} variant="variant-1" required />
								</td>
							</tr>
						))}
				</tbody>
			</table>
			{orders.length <= 0 && (
				<h2 className="text-center mt-5">
					No orders Are Added Yet.
					<br /> Add orders
				</h2>
			)}
		</>
	);
}

export default Orders;

// import React, { useState } from "react";
// import { SelectInput } from "../FormComponents/FormComponents";

// function Orders({ ordersData }) {
// 	const [orders, setOrders] = useState(ordersData);

// 	const statusArray = [
// 		{ label: "booked", value: "booked" },
// 		{ label: "under MW", value: "under MW" },
// 		{ label: "under stitching", value: "under stitching" },
// 		{ label: "finishing work", value: "finishing work" },
// 		{ label: "pending", value: "pending" },
// 		{ label: "delivered", value: "delivered" },
// 	];

// 	function handleStatusChange(orderId, newStatus) {
// 		setOrders((prevOrders) => prevOrders.map((order) => (order._id === orderId ? { ...order, status: newStatus } : order)));
// 		console.log(`Order ${orderId} status changed to ${newStatus}`);
// 	}

// 	return (
// 		<>
// 			<table className="mt-2 main-table">
// 				<thead>
// 					<tr>
// 						<th>Name</th>
// 						<th>Number</th>
// 						<th>Invoice</th>
// 						<th>Categories</th>
// 						<th>Total</th>
// 						<th>Advance</th>
// 						<th>Pending</th>
// 						<th>Status</th>
// 					</tr>
// 				</thead>
// 				<tbody>
// 					{orders.length >= 1 &&
// 						orders.map((order) => (
// 							<tr key={order._id}>
// 								<td>{order.customer.name}</td>
// 								<td>{order.customer.number}</td>
// 								<td>{order.invoice}</td>
// 								<td>{order.categories}</td>
// 								<td>{order.price}</td>
// 								<td>{order.advance}</td>
// 								<td>{order.price - order.advance}</td>
// 								<td>
// 									<SelectInput options={statusArray} label="Status" id={`status-${order._id}`} name="status" defaultValue={order.status} onChange={(e) => handleStatusChange(order._id, e.target.value)} variant="variant-1" required />
// 								</td>
// 							</tr>
// 						))}
// 				</tbody>
// 			</table>
// 			{orders.length <= 0 && (
// 				<h2 className="text-center mt-5">
// 					No orders Are Added Yet.
// 					<br /> Add orders
// 				</h2>
// 			)}
// 		</>
// 	);
// }

// export default Orders;
