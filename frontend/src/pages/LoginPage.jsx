import React, { useState } from "react";
import { TextInput, PasswordInput } from "../components/FormComponents/FormComponents";
import Button from "../components/Button/Button";
import { connect } from "react-redux";

import { login } from "../redux/auth/authActions";
import { showNotification } from "../redux/notification/notificationActions";
import "../styles/LoginPage.css";
import { useNavigate } from "react-router-dom";

function LoginPage({ login, showNotification }) {
	const [logInDetails, setLoginDetails] = useState({ email: "", password: "" });
	const navigate = useNavigate();

	function handleChange(e) {
		setLoginDetails({ ...logInDetails, [e.target.name]: e.target.value });
	}

	async function handleSubmit(e) {
		e.preventDefault();
		await login(logInDetails)
			.then((res) => {
				if (res.user.superAdmin) {
					navigate("/");
				} else {
					navigate("/billing");
				}
				console.log("logged in succesfully");
			})
			.catch((err) => {
				showNotification(err.response ? err.response.data.error : "Network Error");
			});
	}

	return (
		<section className="login-section">
			<form className="login-container" onSubmit={handleSubmit}>
				<h4 className="text-center">Admin Login</h4>
				<TextInput type="email" id="login-input" name="email" label="Email" value={logInDetails.email} variant="variant-1" onChange={handleChange} />
				<PasswordInput id="password-input" name="password" label="Password" value={logInDetails.password} variant="variant-1" onChange={handleChange} />
				<Button className="btn-1 primary m-auto d-block mt-3" type="submit">
					Login
				</Button>
			</form>
		</section>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		login: (logInDetails) => dispatch(login(logInDetails)),
		showNotification: (message) => dispatch(showNotification(message)),
	};
};

export default connect(null, mapDispatchToProps)(LoginPage);
