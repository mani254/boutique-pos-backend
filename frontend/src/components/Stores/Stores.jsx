import React from "react";
import { useOutletContext } from "react-router-dom";
import { connect } from "react-redux";

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { showModal } from "../../redux/modal/modalActions";
import ConfirmationAlert from "../ConfirmationAlert/ConfirmationAlert.jsx";
import { deleteStore } from "../../redux/stores/storeActions.js";

import "./Stores.css";

function Stores({ showModal, deleteStore }) {
	const navigate = useNavigate();

	const { storeData } = useOutletContext();

	const alertData = {
		info: "If you delete the store, all the data of the store will be removed.",
		confirmFunction: (storeId) => {
			deleteStore(storeId);
		},
	};

	return (
		<>
			<table className="mt-5">
				<thead>
					<tr>
						<th>Name</th>
						<th>Address</th>
						<th>Image</th>
						<th>Status</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{storeData.stores.length >= 1 &&
						storeData.stores.map((store) => (
							<tr key={store._id}>
								<td>{store.name}</td>
								<td>{store.address}</td>
								<td>
									<div className="image-wrapper">
										<img className="cover" src={`${process.env.REACT_APP_BACKENDURI}/${store.image}`} alt="store-image" />
									</div>
								</td>
								<td>
									<div
										className={`toggle-switch ${store.status && "active"}`}
										// onClick={() => {
										// 	updateStoreStatus({ _id: store._id, status: !store.status });
										// }}
									>
										<div className="toggle-switch-background">
											<div className="toggle-switch-handle"></div>
										</div>
									</div>
								</td>
								<td>
									<span className="icon edit-icon" onClick={() => navigate(`/stores/edit/${store._id}`)}>
										<FaEdit />
									</span>
									<span className="icon delete-icon" onClick={() => showModal({ ...alertData, id: store._id }, ConfirmationAlert)}>
										<MdDelete />
									</span>
								</td>
							</tr>
						))}
				</tbody>
			</table>
			{storeData.stores.length <= 0 && (
				<h2 className="text-center mt-5">
					No Stores Are Added Yet.
					<br /> Add stores
				</h2>
			)}
		</>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		showModal: (props, component) => dispatch(showModal(props, component)),
		deleteStore: (storeId) => dispatch(deleteStore(storeId)),
	};
};

export default connect(null, mapDispatchToProps)(Stores);
