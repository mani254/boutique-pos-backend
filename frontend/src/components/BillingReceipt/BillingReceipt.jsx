import React, { useState, useEffect } from "react";
import "./BillingReceipt.css";

function BillingReceipt({ items, customerDetails, billInfo }) {
	let formattedDateTime = getFormattedDateTime();
	const [amountInWords, setAmountInWords] = useState("Zero");
	const [balance, setBalance] = useState(billInfo.total);

	useEffect(() => {
		const amountInWords = convertAmountToWords(billInfo.total);
		setAmountInWords(amountInWords);
	}, [billInfo.total]);

	useEffect(() => {
		let balance = calculateBalance(billInfo.total, billInfo.advance);
		setBalance(balance);
	}, [billInfo.total, billInfo.advance]);

	return (
		<div className="receipt" id="bill-receipt">
			<div className="title mt-4">
				<h3 className="text-center">Sruthi Boutique</h3>
				<p className="text-center mb-1">Flat No 494, Kings court Avenue, Magunta Layout, Main Road, Nellore</p>
				<p className="text-center mt-0">Phone: 8688014415</p>
			</div>
			{/* <h3 className="text-center mt-4">Stitching Invoice</h3> */}
			<hr />
			<div className="d-flex align-items-center justify-content-between">
				<div className="text-left">
					<p className="mb-1">
						<strong>Customer:</strong> {customerDetails.name}
					</p>
					<p>
						<strong>Mobile:</strong> {customerDetails.phone}
					</p>
				</div>
				<div className="text-right">
					<p className="mb-1">
						<strong>Invoice:</strong> <span>234</span>
					</p>
					<p>
						<strong>Date:</strong>
						<span> {formattedDateTime}</span>
					</p>
				</div>
			</div>

			<table>
				<thead>
					<tr>
						<th>s.no</th>
						<th>Category</th>
						<th>Quantity</th>
						<th>Price</th>
						<th>Total</th>
					</tr>
				</thead>
				<tbody>
					{items.length > 0 &&
						items.map((item, index) => (
							<tr key={item.id}>
								<td className="s-no">{index + 1}</td>
								<td className="category">{item.category}</td>
								<td className="quantity">{item.quantity}</td>
								<td className="price">{item.price}</td>
								<td className="total">{item.sTotal}</td>
							</tr>
						))}
					<tr>
						<td className="s-no"></td>
						<td className="category"></td>
						<td className="quantity">
							<strong>{}</strong>
						</td>
						<td className="price">
							<strong>{}</strong>
						</td>
						<td className="total">
							<strong>{}</strong>
						</td>
					</tr>
				</tbody>
			</table>
			<hr />
			<div className="d-flex justify-content-between">
				<strong className="amount-in-words">Amount in Words: {amountInWords} Rupees Only /-</strong>
				<div>
					<p className="mb-1">
						<strong>discount: </strong>
						<span> {billInfo.discount}</span>
					</p>
					<p className="mb-1">
						<strong>Net Amount</strong>
						<span> {billInfo.total}</span>
					</p>
				</div>
			</div>
			<hr />
			<div className="d-flex align-items-center justify-content-between">
				<p className="mb-1">
					<strong>Delivary Date:</strong>
					<span> {billInfo.delivaryDate}</span>
				</p>
				<p className="mb-1">
					<strong>Advance Paid:</strong>
					<span> {billInfo.advance}</span>
				</p>
				<p className="mb-1">
					<strong>Balace to be Paid:</strong>
					<span> {balance}</span>
				</p>
			</div>
			<br />

			<p className="text-center mb-1">Thankyou for using our stitching service</p>

			<p className="text-center">Please visit us again</p>
		</div>
	);
}

function getFormattedDateTime() {
	let now = new Date();

	let monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

	let day = now.getDate();
	let monthIndex = now.getMonth();
	let year = now.getFullYear();
	let hours = now.getHours();
	let minutes = now.getMinutes();
	let seconds = now.getSeconds();

	let month = monthNames[monthIndex];

	if (day < 10) {
		day = "0" + day;
	}
	if (hours < 10) {
		hours = "0" + hours;
	}
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	let formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
	return formattedDateTime;
}

function convertAmountToWords(amount) {
	// Arrays for single-digit and teen numbers
	const units = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
	const teens = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
	// Array for tens numbers
	const tens = ["", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

	// Function to convert a two-digit number to words
	function twoDigitsToWords(num) {
		if (num < 10) {
			return units[num];
		} else if (num < 20) {
			return teens[num - 10];
		} else {
			let ten = Math.floor(num / 10);
			let unit = num % 10;
			return tens[ten] + (unit !== 0 ? " " + units[unit] : "");
		}
	}

	// Function to convert a three-digit number to words
	function threeDigitsToWords(num) {
		let hundred = Math.floor(num / 100);
		let remainder = num % 100;
		let words = "";

		if (hundred !== 0) {
			words += units[hundred] + " hundred";
			if (remainder !== 0) {
				words += " ";
			}
		}

		if (remainder !== 0) {
			words += twoDigitsToWords(remainder);
		}

		return words;
	}

	function numberToWords(num) {
		if (num === 0) {
			return "zero";
		}

		let words = "";
		let billion = Math.floor(num / 1000000000);
		let million = Math.floor((num % 1000000000) / 1000000);
		let thousand = Math.floor((num % 1000000) / 1000);
		let remainder = num % 1000;

		if (billion !== 0) {
			words += threeDigitsToWords(billion) + " billion ";
		}
		if (million !== 0) {
			words += threeDigitsToWords(million) + " million ";
		}
		if (thousand !== 0) {
			words += threeDigitsToWords(thousand) + " thousand ";
		}
		if (remainder !== 0) {
			words += threeDigitsToWords(remainder);
		}

		return words.trim();
	}

	return numberToWords(amount);
}

function calculateBalance(total, advance) {
	return total - advance;
}

export default BillingReceipt;
