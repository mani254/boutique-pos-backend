import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Button from "../Button/Button";
import "./Admin.css";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getAdmins } from "../../redux/admin/adminActions";

function AdminPageLayout({ admins, getAdmins }) {
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			try {
				await getAdmins();
			} catch (error) {
				console.error(error.response ? error.response.data.error : "Network Error");
			}
		})();
	}, []);

	return (
		<div className="backend-container admin-container">
			<div className="d-flex align-items-center justify-content-between">
				<h2>Admins</h2>
				<Button className="btn-2 primary" onClick={() => navigate("/admins/add")}>
					Add Admins
				</Button>
			</div>
			<hr />
			<Outlet context={{ adminData: admins }} />
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		admins: state.admin,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getAdmins: () => dispatch(getAdmins()),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(AdminPageLayout);
