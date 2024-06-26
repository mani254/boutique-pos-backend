import React from "react";

import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Modal from "./components/Modal/Modal.jsx";
import Notification from "./components/Notification/Notification.jsx";

import LoginPage from "./pages/LoginPage.jsx";
import AdminLayout from "./components/AdminLayout/AdminLayout.js";

function App({ modal }) {
	axios.defaults.withCredentials = true;

	return (
		<div className="App">
			<Notification />
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/" element={<AdminLayout />}>
            
            </Route>
			</Routes>
			{modal.showModal && <Modal props={modal.modalProps} component={modal.modalComponent} />}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		modal: state.modal,
	};
};

export default connect(mapStateToProps, null)(App);
