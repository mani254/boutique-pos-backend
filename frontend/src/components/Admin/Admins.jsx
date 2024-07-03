import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { showModal } from "../../redux/modal/modalActions";
import ConfirmationAlert from "../ConfirmationAlert/ConfirmationAlert.jsx";
import { deleteAdmin } from "../../redux/admin/adminActions.js";

function Admins({ showModal, deleteAdmin, adminsData }) {
	const navigate = useNavigate();

	const alertData = {
		info: "Are you sure you want to delete this admin?",
		confirmFunction: (adminId) => {
			deleteAdmin(adminId);
		},
	};

	return (
		<>
			<table className="mt-5">
				<thead>
					<tr>
						<th>S.NO</th>
						<th>Store</th>
						<th>Name</th>
						<th>Email</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{adminsData.admins.length >= 1 &&
						adminsData.admins.map((admin, index) => (
							<tr key={admin._id}>
								<td>{index + 1}</td>
								<td>{admin.store.name}</td>
								<td>{admin.username}</td>
								<td>{admin.email}</td>

								<td>
									<span className="icon edit-icon" onClick={() => navigate(`/admins/edit/${admin._id}`)}>
										<FaEdit />
									</span>
									<span className="icon delete-icon" onClick={() => showModal({ ...alertData, id: admin._id }, ConfirmationAlert)}>
										<MdDelete />
									</span>
								</td>
							</tr>
						))}
				</tbody>
			</table>
			{adminsData.admins.length <= 0 && (
				<h2 className="text-center mt-5">
					No Admins Are Added Yet.
					<br /> Add admins
				</h2>
			)}
		</>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		showModal: (props, component) => dispatch(showModal(props, component)),
		deleteAdmin: (adminId) => dispatch(deleteAdmin(adminId)),
	};
};

const mapStateToProps = (state) => {
	return {
		adminsData: state.admin, // Replace with your actual Redux state slice for admins
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Admins);
