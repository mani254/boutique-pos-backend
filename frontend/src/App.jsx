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

import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Categories from "./components/Category/Categories.jsx";

import StoreLayout from "./components/Stores/StoreLayout.jsx";
import Stores from "./components/Stores/Stores.jsx";
import AddStore from "./components/Stores/AddStore.jsx";
import UpdateStore from "./components/Stores/updateStore.jsx";

import BillingLayout from "./components/Billing/BillingLayout.jsx";

import AdminPageLayout from "./components/Admin/AdminPageLayout.jsx";
import Admins from "./components/Admin/Admins.jsx";
import AddAdmin from "./components/Admin/AddAdmin.jsx";
import UpdateAdmin from "./components/Admin/updateAdmin.jsx";

function App({ modal }) {
	axios.defaults.withCredentials = true;

	return (
		<div className="App">
			<Notification />
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/" element={<AdminLayout />}>
					<Route index element={<Dashboard />}></Route>
					<Route path="/categories" element={<Categories />}></Route>
					<Route path="stores" element={<StoreLayout />}>
						<Route index element={<Stores />}></Route>
						<Route path="add" element={<AddStore />} />
						<Route path="edit/:id" element={<UpdateStore />} />
					</Route>
					<Route path="admins" element={<AdminPageLayout />}>
						<Route index element={<Admins />}></Route>
						<Route path="add" element={<AddAdmin />} />
						<Route path="edit/:id" element={<UpdateAdmin />} />
					</Route>
					<Route path="billing" element={<BillingLayout />} />
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
