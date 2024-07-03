import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Button from "../Button/Button";
import "./Stores.css";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getStores } from "../../redux/stores/storeActions";

function StoreLayout({ stores, getStores }) {
	const navigate = useNavigate();

	
	useEffect(() => {
		(async () => {
			try {
				await getStores();
				console.log("Stores are fetched in the useEffect on the stores page");
			} catch (error) {
				console.error(error.response ? error.response.data.error : "Network Error");
			}
		})();
	}, []);

	return (
		<div className="backend-container store-container">
			<div className="d-flex align-items-center justify-content-between">
				<h2>Stores</h2>
				<Button className="btn-2 primary" onClick={() => navigate("/stores/add")}>
					Add Stores
				</Button>
			</div>
			<hr />
			<Outlet context={{ storeData: stores }} />
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		stores: state.store,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getStores: () => dispatch(getStores()),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(StoreLayout);
