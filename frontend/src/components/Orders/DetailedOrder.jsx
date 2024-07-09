import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { showNotification } from "../../redux/notification/notificationActions";
import { connect } from "react-redux";
import BillingReceipt from "../BillingReceipt/BillingReceipt";

function DetailedOrder() {
	const { orderId } = useParams();
	const [items, setItems] = useState([]);
	const [customerDeatils, setCustomerDeatils] = useState({
		name: "",
		phone: "",
	});
	const [billInfo, setBillInfo] = useState({ discount: 0, advance: 0, total: 0, note: null, deliveryDate: "" });
	const [invoice, setInvoice] = useState("");

	useEffect(() => {
		const fetchOrder = async () => {
			try {
				const res = await axios.get(`${process.env.REACT_APP_BACKENDURI}/api/order/${orderId}`);
				// setOrder(res.data);
				setCustomerDeatils({
					name: res.data.customer.name,
					phone: res.data.customer.number,
				});
				setItems(res.data.items);
				setBillInfo({
					discount: res.data.discount,
					advance: res.data.advance,
					total: res.data.price,
					note: res.data.note,
					deliveryDate: res.data.deliveryDate,
				});
				setInvoice(res.data.invoice);
			} catch (err) {
				console.error(err);
				showNotification(err.response ? err.response.data.error : "Network Error");
			}
		};
		fetchOrder();
	}, [orderId]);

	return (
		<div className={`backend-container orders-container detailed-container`}>
			<div className="d-flex align-items-center justify-content-between">
				<h2>Detailed Order</h2>
			</div>
			<hr />

			<BillingReceipt items={items} customerDetails={customerDeatils} billInfo={billInfo} invoice={invoice} />
		</div>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		showNotification: (message) => dispatch(showNotification(message)),
	};
};

export default connect(null, mapDispatchToProps)(DetailedOrder);
