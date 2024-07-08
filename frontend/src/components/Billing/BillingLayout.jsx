import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import "./Billing.css";

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { connect } from "react-redux";
import { getCategories } from "../../redux/categories/categoryActions";
import html2canvas from "html2canvas";

import { TextInput, TelInput, SelectInput, NumberInput, TextArea, DateInput } from "../FormComponents/FormComponents";
import BillingReceipt from "../BillingReceipt/BillingReceipt";
import axios from "axios";
import { showNotification } from "../../redux/notification/notificationActions";

function BillingLayout({ categoriesData, getCategories, showNotification }) {
	const [items, setItems] = useState([]);
	const [customerDeatils, setCustomerDeatils] = useState({
		name: "",
		phone: "",
	});
	const [categoryOptions, setCategoryOptions] = useState([]);
	const [singleItem, setSingleItems] = useState({
		category: "",
		quantity: null,
		price: null,
		sTotal: 0,
	});
	const [billInfo, setBillInfo] = useState({ discount: 0, advance: 0, total: 0, note: null, delivaryDate: "" });

	const fetchCategories = async () => {
		try {
			await getCategories();
		} catch (err) {
			console.error("Error while fetching categories:", err.response ? err.response.data.error : "Network Error");
		}
	};

	function setOptionCategories() {
		if (categoriesData.categories.length >= 1) {
			const options = categoriesData.categories.map((item) => ({
				value: item.name,
				label: item.name,
			}));
			setCategoryOptions(options);
			setSingleItems({ ...singleItem, category: options[0].value });
		}
	}

	useEffect(() => {
		fetchCategories();
	}, []);

	useEffect(() => {
		setOptionCategories();
	}, [categoriesData]);

	useEffect(() => {
		console.log("hello");
		setSingleItems({ ...singleItem, sTotal: singleItem.quantity * singleItem.price });
	}, [singleItem.quantity, singleItem.price]);

	useEffect(() => {
		calcGrandTotal();
	}, [billInfo.discount, items]);

	function handleChange(e) {
		const { value, name } = e.target;
		setCustomerDeatils({ ...customerDeatils, [name]: value });
	}

	function handleItem(e) {
		const { value, name } = e.target;
		if (name === "category") {
			document.getElementById("quantity").focus();
		}
		setSingleItems({ ...singleItem, [name]: value });
	}

	function handleDeleteItem(index) {
		const updatedItems = [...items];
		updatedItems.splice(index, 1);
		setItems(updatedItems);
	}

	function handleUpdateItem(index) {
		const updatedItems = [...items];
		const removedItem = updatedItems.splice(index, 1);
		setItems(updatedItems);
		setSingleItems(removedItem[0]);
	}

	function handleItemEntry() {
		setItems([...items, singleItem]);
		setSingleItems({ ...singleItem, price: "", sTotal: "", quantity: "" });
	}

	function calcGrandTotal() {
		let total = 0;
		items.forEach((item) => {
			console.log(item.total, "itemTotal", typeof item.sTotal);
			total = total + item.sTotal;
		});
		let grandTotal = total - billInfo.discount;

		setBillInfo((prev) => ({ ...prev, total: grandTotal }));
	}

	async function handleSubmit() {
		if (!customerDeatils.name || !customerDeatils.phone) return showNotification("Fill customer Details");
		if (items.length <= 0) return showNotification("Add atleaset one Item");

		let dataToSend = { ...customerDeatils, ...billInfo, items: items };
		try {
			const res = await axios.post(`${process.env.REACT_APP_BACKENDURI}/api/order`, dataToSend);
			if (res.data) {
				setItems([]);
				setBillInfo({ discount: 0, advance: 0, total: 0, note: null, delivaryDate: "" });
				setCustomerDeatils({
					name: "",
					phone: "",
				});
				printBill();
			}
		} catch (err) {
			console.error("Error while billing", err);
			showNotification(err.response ? err.response.data.error : "Network Error");
		}
	}

	return (
		<div className="backend-container billing-container">
			<div className="row">
				<div className="col-lg-8">
					<div className="items-wrapper">
						<h4>Items</h4>
						<hr />
						<table>
							<thead>
								<tr>
									<th>s.no</th>
									<th>Category</th>
									<th>Quantity</th>
									<th>Price</th>
									<th>Total</th>
									<th className="">Action</th>
								</tr>
							</thead>
							<tbody>
								{items.length > 0 &&
									items.map((item, index) => (
										<tr key={item.id}>
											<td className="s-no">{index + 1}</td>
											<td className="type">{item.category}</td>
											<td className="size">{item.quantity}</td>
											<td className="actual-price">{item.price}</td>
											<td className="reduced-price">{item.sTotal}</td>
											<td className="edit-del d-flex">
												<span
													className="icon edit-icon"
													onClick={() => {
														handleUpdateItem(index);
													}}>
													<FaEdit />
												</span>
												<span
													className="icon delete-icon"
													onClick={() => {
														handleDeleteItem(index);
													}}>
													<MdDelete />
												</span>
											</td>
										</tr>
									))}
								<tr className="items-entry">
									<td className="s-no">{items.length + 1}</td>
									<td className="type">{categoryOptions.length >= 1 && <SelectInput options={categoryOptions} label="Category" id="category" defaultValue={singleItem.category} variant="variant-1" name="category" onChange={handleItem} required />}</td>

									<td>
										<NumberInput
											label="Quantity"
											name="quantity"
											id="quantity"
											onChange={handleItem}
											value={singleItem.quantity}
											variant="variant-1"
											required
											onKeyDown={(e) => {
												if (e.key === "Enter") {
													document.getElementById("price").focus();
												}
											}}></NumberInput>
									</td>
									<td>
										<NumberInput
											label="Price"
											name="price"
											id="price"
											onChange={handleItem}
											value={singleItem.price}
											variant="variant-1"
											required
											onKeyDown={(e) => {
												if (e.key === "Enter") handleItemEntry();
											}}></NumberInput>
									</td>
									<td className="reduced-price">
										<NumberInput label="sTotal:" name="sTotal" id="sTotal" value={singleItem.sTotal} variant="variant-1" required></NumberInput>
									</td>
									<td className="edit-del pt-2" onClick={handleItemEntry}>
										<Button className="btn-2 primary">Enter</Button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div className="col-lg-4">
					<div className="customer-info">
						<h4>Customer Deatils</h4>
						<hr />
						<TextInput label="Name:" name="name" id="store-name" placeholder="customerName" onChange={handleChange} value={customerDeatils.name} variant="variant-1" required>
							{/* {errors.name && <p className="error">{errors.name}</p>} */}
						</TextInput>

						<TelInput label="Phone No:" name="phone" id="phone" placeholder="Phone No" onChange={handleChange} value={customerDeatils.phone} variant="variant-1" required>
							{/* {errors.phone && <p className="error">{errors.phone}</p>} */}
						</TelInput>
					</div>
					<div className="bill-info mt-4">
						<h4>Bill Info</h4>
						<hr />

						<div className="discount-input">
							<div className="d-flex align-items-center justify-content-between mt-2 total-flex">
								<p>Delivary Date:</p>
								<DateInput name="delivaryDate" value={billInfo.delivaryDate} onChange={(e) => setBillInfo((prev) => ({ ...prev, delivaryDate: e.target.value }))} />
							</div>
							<NumberInput
								label="Special Discount:"
								name="discount"
								id="discount"
								value={billInfo.discount}
								onChange={(e) => {
									setBillInfo((prev) => ({ ...prev, discount: e.target.value }));
								}}
								variant="variant-1"
								required></NumberInput>

							<NumberInput
								label="Advance paid:"
								name="advance"
								id="advance"
								value={billInfo.advance}
								onChange={(e) => {
									setBillInfo((prev) => ({ ...prev, advance: e.target.value }));
								}}
								variant="variant-1"
								required></NumberInput>

							<div className="d-flex align-items-center justify-content-between mt-2 total-flex">
								<p>Total:</p>
								<p>{billInfo.total}</p>
							</div>
						</div>
						<hr className="mt-0" />
					</div>

					<div className="extra-info mt-4">
						<TextArea
							label="Note:"
							name="note"
							id="note"
							onChange={(e) => {
								setBillInfo((prev) => ({ ...prev, note: e.target.value }));
							}}
							value={billInfo.note}
							variant="variant-1"
							required></TextArea>
					</div>

					<div className="d-flex justify-content-end">
						<Button className="btn-2 primary mt-4" onClick={handleSubmit}>
							Save and Print
						</Button>
					</div>
				</div>
			</div>
			<div className="receipt-container">
				<BillingReceipt items={items} customerDetails={customerDeatils} billInfo={billInfo} />
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	categoriesData: state.category,
});

const mapDispatchToProps = (dispatch) => ({
	getCategories: () => dispatch(getCategories()),
	showNotification: (message) => dispatch(showNotification(message)),
});

async function printBill() {
	const billReceipt = document.getElementById("bill-receipt");

	if (!billReceipt) {
		console.log("billReceipt is not existed");
		return;
	}

	try {
		const canvas = await html2canvas(billReceipt);
		const imageData = canvas.toDataURL("image/png");

		// Create an invisible iframe
		const iframe = document.createElement("iframe");
		iframe.style.position = "absolute";
		iframe.style.width = "0px";
		iframe.style.height = "0px";
		iframe.style.border = "none";

		document.body.appendChild(iframe);

		// Write the image to the iframe and wait for the content to load before printing
		const doc = iframe.contentWindow.document;
		doc.open();
		doc.write("<html><head><title>Print Receipt</title></head><body>");
		doc.write(`<img src="${imageData}" />`);
		doc.write("</body></html>");
		doc.close();

		iframe.onload = function () {
			iframe.contentWindow.focus();
			iframe.contentWindow.print();

			// Clean up after printing
			document.body.removeChild(iframe);
		};
	} catch (error) {
		console.error("Error converting to image:", error);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(BillingLayout);
