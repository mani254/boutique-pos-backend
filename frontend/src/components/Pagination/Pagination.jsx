import React from "react";
import { FaAngleLeft, FaAngleRight, FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import Button from "../Button/Button";

import "./Pagination.css";

const Pagination = ({ currentPage, setCurrentPage, totalOrders }) => {
	const totalPages = Math.ceil(parseInt(totalOrders) / 10);

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handleNextPages10 = () => {
		if (currentPage + 10 <= totalPages) {
			setCurrentPage(currentPage + 10);
		} else {
			setCurrentPage(totalPages);
		}
	};

	const handlePrevPages10 = () => {
		if (currentPage - 10 >= 1) {
			setCurrentPage(currentPage - 10);
		} else {
			setCurrentPage(1);
		}
	};

	return (
		<div className="pagination mt-5 d-flex align-items-center justify-content-center">
			<div className="d-flex">
				<Button onClick={handlePrevPages10} disabled={currentPage <= 10}>
					<FaAnglesLeft />
				</Button>
				<Button onClick={handlePrevPage} disabled={currentPage === 1}>
					<FaAngleLeft />
				</Button>
				<p>
					Page {currentPage} of {totalPages}
				</p>
				<Button onClick={handleNextPage} disabled={currentPage === totalPages}>
					<FaAngleRight />
				</Button>
				<Button onClick={handleNextPages10} disabled={currentPage + 10 > totalPages}>
					<FaAnglesRight />
				</Button>
			</div>
		</div>
	);
};

export default Pagination;
