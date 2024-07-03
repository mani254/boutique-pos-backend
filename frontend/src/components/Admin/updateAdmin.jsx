import React, { useState, useEffect, useContext } from "react";
import { TextInput, SelectInput, PasswordInput } from "../FormComponents/FormComponents";
import Button from "../Button/Button";
import { connect } from "react-redux";
import { updateAdmin } from "../../redux/admin/adminActions"; // Assuming this action exists in your Redux setup
import { showNotification } from "../../redux/notification/notificationActions";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import validateField from "../../utils/validations";
import { getStores } from "../../redux/stores/storeActions";

function UpdateAdmin({ updateAdmin, showNotification, storesData, getStores }) {
	const [adminDetails, setAdminDetails] = useState({
		username: "",
		email: "",
		password: "",
		store: "",
	});

	const [errors, setErrors] = useState({
		name: "",
		email: "",
		password: "",
	});

	const [optionStores, setOptionStores] = useState([]);

	const navigate = useNavigate();
	const { id } = useParams();
	const { adminData } = useOutletContext();

	const fetchStores = async () => {
		try {
			await getStores();
		} catch (err) {
			console.error("Error while fetching Stores:", err.response ? err.response.data.error : "Network Error");
		}
	};

	function setStoresOptions() {
		if (storesData.stores.length >= 1) {
			const options = storesData.stores.map((item) => ({
				value: item._id,
				label: item.name,
			}));
			setOptionStores(options);
		}
	}

	useEffect(() => {
		if (adminData.admins.length <= 0) return;
		const currentAdmin = adminData.admins.filter((admin) => id === admin._id);
		console.log(currentAdmin);
		setAdminDetails({ username: currentAdmin[0].username, email: currentAdmin[0].email, store: currentAdmin[0].store._id, password: "", _id: currentAdmin[0]._id });
	}, [adminData.admins]);

	useEffect(() => {
		fetchStores();
	}, []);

	useEffect(() => {
		setStoresOptions();
	}, [storesData]);

	function handleChange(e) {
		const { name, value } = e.target;
		setAdminDetails({ ...adminDetails, [name]: value });

		let errorMessage = validateField(name, value);
		setErrors({ ...errors, [name]: errorMessage });
	}

	async function handleUpdateAdmin() {
		const hasError = Object.values(errors).some((value) => value);
		const isEmpty = !adminDetails.username || !adminDetails.email || !adminDetails.store;

		if (isEmpty) {
			return showNotification("Fill all the details");
		}
		if (hasError) {
			return;
		}

		try {
			await updateAdmin(adminDetails);
			console.log("Admin updated successfully");
			navigate("/admins"); // Navigate to admins list page after update
		} catch (error) {
			console.error(error.response ? error.response.data.error : "Network Error");
		}
	}

	return (
		<div className="container add-container">
			<div className="row">
				<div className="col-lg-6">
					<TextInput label="Username:" name="username" id="admin-username" onChange={handleChange} value={adminDetails.username} variant="variant-1" required>
						{errors.username && <p className="error">{errors.username}</p>}
					</TextInput>
				</div>
				<div className="col-lg-6">
					<TextInput type="email" label="Email:" name="email" id="admin-email" onChange={handleChange} value={adminDetails.email} variant="variant-1" required>
						{errors.email && <p className="error">{errors.email}</p>}
					</TextInput>
				</div>
				<div className="col-lg-6">
					<SelectInput options={optionStores} label="Store" id="Store" variant="variant-1" defaultValue={adminDetails.store} name="store" onChange={handleChange} required />
				</div>
				<div className="col-lg-6">
					<PasswordInput label="Password:" name="password" id="admin-password" onChange={handleChange} value={adminDetails.password} variant="variant-1" required>
						{errors.password && <p className="error">{errors.password}</p>}
					</PasswordInput>
				</div>
				<div className="col-lg-12 text-center">
					<Button className="btn-2 primary mt-4" onClick={handleUpdateAdmin}>
						Update Admin
					</Button>
				</div>
			</div>
		</div>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateAdmin: (adminDetails) => dispatch(updateAdmin(adminDetails)),
		showNotification: (message) => dispatch(showNotification(message)),
		getStores: () => dispatch(getStores()),
	};
};

const mapStateToProps = (state) => {
	return {
		storesData: state.store,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAdmin);
