import React from "react";
import { SelectInput } from "../FormComponents/FormComponents";

function Orders({ ordersData }) {
	const statusArray = [
		{ label: "booked", value: "booked" },
		{ label: "under MW", value: "under MW" },
		{ label: "under stitching", value: "under stitching" },
		{ label: "finishing work", value: "finishing work" },
		{ label: "pending", value: "pending" },
		{ label: "delivered", value: "delivered" },
	];

	function handleStatusChange() {
		return null;
	}

	return (
		<>
			<table className="mt-2 main-table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Number</th>
						<th>Categories</th>
						<th>Note</th>
						<th>Total</th>
						<th>Advance</th>
						<th>Pending</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{ordersData.length >= 1 &&
						ordersData.map((order) => (
							<tr key={order._id}>
								<td>{order.customer.name}</td>
								<td>{order.customer.number}</td>
								<td>{order.categories}</td>
								<td>{order.note}</td>
								<td>{order.price}</td>
								<td>{order.advance}</td>
								<td>{order.price - order.advance}</td>
								<td>
									<SelectInput options={statusArray} label="Status" id="status" name="status" defaultValue={order.status} onChange={handleStatusChange} variant="variant-1" required />
								</td>
							</tr>
						))}
				</tbody>
			</table>
			{ordersData.length <= 0 && (
				<h2 className="text-center mt-5">
					No orders Are Added Yet.
					<br /> Add orders
				</h2>
			)}
		</>
	);
}

export default Orders;
