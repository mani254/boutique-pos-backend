import React from "react";
import Button from "../Button/Button";
import "./ConfirmationAlert.css";
import CloseModelBtn from "../Modal/CloseModelBtn";
import { hideModal } from "../../redux/modal/modalActions";
import { connect } from "react-redux";

function ConfirmationAlert({ info, confirmFunction, hideModal, id }) {
	return (
		<div className="card">
			<div className="card-content">
				<p className="card-heading">Delete file?</p>
				<p className="card-description">{info}</p>
			</div>
			<div className="card-button-wrapper">
				<Button className="btn-1 primary" onClick={() => hideModal()}>
					Cancel
				</Button>
				<Button
					className="btn-1 tertiary"
					onClick={() => {
						confirmFunction(id);
						hideModal();
					}}>
					Delete
				</Button>
			</div>
			<CloseModelBtn onClick={() => hideModal()} />
		</div>
	);
}

const mapDispatchToProps = (dispatch) => ({
	hideModal: () => dispatch(hideModal()),
});

export default connect(null, mapDispatchToProps)(ConfirmationAlert);
