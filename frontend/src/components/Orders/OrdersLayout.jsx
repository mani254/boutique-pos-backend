import React, { useEffect, useState } from "react";
import "./Orders.css";
import { showNotification } from "../../redux/notification/notificationActions";
import axios from "axios";
import { connect } from "react-redux";
import Orders from "./Orders";
import Pagination from "../Pagination/Pagination";
import SearchComponent from "../SearchComponent/SearchComponent";
import { SelectInput } from "../FormComponents/FormComponents";

function OrdersLayout({ showNotification }) {
	const statusArray = [
		{ label: "all", value: "all" },
		{ label: "booked", value: "booked" },
		{ label: "under MW", value: "under MW" },
		{ label: "under stitching", value: "under stitching" },
		{ label: "finishing work", value: "finishing work" },
		{ label: "pending", value: "pending" },
		{ label: "delivered", value: "delivered" },
	];

	const [orders, setOrders] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalOrders, setTotalOrders] = useState(0);
	const [searchValue, setSearchValue] = useState("");
	const [statusValue, setStatusValue] = useState("");

	const fetchOrders = async (page = 1, searchQuery = "", statusValue = "") => {
		page = page - 1;
		try {
			const limit = 10;
			const skip = page * limit;
			const res = await axios.get(`${process.env.REACT_APP_BACKENDURI}/api/order`, {
				params: {
					limit,
					skip,
					search: searchQuery,
					status: statusValue,
				},
			});
			if (res.data) {
				setOrders(res.data.orders);
				setTotalOrders(res.data.totalOrdersCount);
			}
		} catch (err) {
			console.log(err);
			showNotification(err.response ? err.response.data.error : "Network Error");
		}
	};

	useEffect(() => {
		fetchOrders(currentPage, searchValue, statusValue);
	}, [currentPage, searchValue, statusValue]);

	const handleSearch = (query) => {
		setSearchValue(query);
	};

	return (
		<div className="backend-container orders-container">
			<div className="d-flex align-items-center justify-content-between">
				<h2>Orders</h2>
				<SearchComponent name="searchvalue" variant="variant-1" value={searchValue} onSearch={handleSearch} />
				<SelectInput options={statusArray} label="Status" id="status" name="status" defaultValue={statusValue} onChange={(e) => setStatusValue(e.target.value)} variant="variant-1" required />
			</div>
			<hr />
			<Orders ordersData={orders} />
			<Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalOrders={totalOrders} />
		</div>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		showNotification: (message) => dispatch(showNotification(message)),
	};
};

export default connect(null, mapDispatchToProps)(OrdersLayout);
