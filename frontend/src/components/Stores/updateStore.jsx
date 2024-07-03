import React, { useState, useEffect } from "react";
import SingleImageComponent from "../ImageComponent/SingleImageComponent";
import { TextInput, TextArea, SelectInput, TelInput } from "../FormComponents/FormComponents";
import Button from "../Button/Button";
import { connect } from "react-redux";
import { updateStore } from "../../redux/stores/storeActions";
import { showNotification } from "../../redux/notification/notificationActions";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import validateField from "../../utils/validations";

function UpdateStore({ updateStore, showNotification }) {
	const [storeDetails, setStoreDetails] = useState({
		name: "",
		properator: "",
		phone: "",
		landLine: "",
		address: "",
		status: true,
		image: null,
	});

	const [errors, setErrors] = useState({ name: "", properator: "", phone: "", landLine: "", address: "", image: "" });
	const navigate = useNavigate();
	const { storeData } = useOutletContext();
	const { id } = useParams();

	useEffect(() => {
		const currentStore = storeData.stores.find((store) => store._id === id);
		if (!currentStore) {
			return;
		}
		setStoreDetails(currentStore);
	}, [storeData]);

	function handleChange(e) {
		const { name, value } = e.target;
		setStoreDetails({ ...storeDetails, [name]: value });

		if (name !== "image") {
			let errorMessage = validateField(name, value);
			setErrors({ ...errors, [name]: errorMessage });
		}
	}

	async function handleUpdateStore() {
		const hasError = Object.values(errors).some((value) => value);
		const isEmpty = !storeDetails.name || !storeDetails.address || !storeDetails.image || !storeDetails.landLine;
		if (isEmpty) {
			return showNotification("Fill all the details");
		}
		if (hasError) {
			return;
		}
		try {
			await updateStore(storeDetails);
			console.log("Store updated successfully");
			navigate("/stores");
		} catch (error) {
			console.error(error.response ? error.response.data.error : "Network Error");
		}
	}

	return (
		<div className="container add-container">
			<div className="row">
				<div className="col-lg-6">
					<TextInput label="Name:" name="name" id="store-name" onChange={handleChange} value={storeDetails.name} variant="variant-1" required>
						{errors.name && <p className="error">{errors.name}</p>}
					</TextInput>
				</div>
				<div className="col-lg-6">
					<TextInput label="Properator:" name="properator" id="properator" onChange={handleChange} value={storeDetails.properator} variant="variant-1" required>
						{errors.properator && <p className="error">{errors.properator}</p>}
					</TextInput>
				</div>
				<div className="col-lg-6">
					<TelInput label="Phone No:" name="phone" id="phone" onChange={handleChange} value={storeDetails.phone} variant="variant-1" required>
						{errors.phone && <p className="error">{errors.phone}</p>}
					</TelInput>
				</div>
				<div className="col-lg-6">
					<TextInput label="Land line" name="landLine" id="landLine" onChange={handleChange} value={storeDetails.landLine} variant="variant-1" required>
						{errors.landLine && <p className="error">{errors.landLine}</p>}
					</TextInput>
				</div>
				<div className="col-lg-6">
					<div className="col-lg-6">
						<SelectInput
							options={[
								{ value: true, label: "Active" },
								{ value: false, label: "InActive" },
							]}
							label="Status:"
							id="banner-status"
							defaultValue={storeDetails.status}
							variant="variant-1"
							name="status"
							onChange={handleChange}
							required
						/>
					</div>
				</div>
				<div className="col-lg-6">
					<TextArea label="Address" name="address" id="address" onChange={handleChange} value={storeDetails.address} variant="variant-1" required>
						{errors.address && <p className="error">{errors.address}</p>}
					</TextArea>
				</div>
				<div className="col-lg-12">{storeDetails.image && <SingleImageComponent setParentDetails={setStoreDetails} parentDetails={storeDetails} />}</div>
				<div className="col-12 text-center">
					<Button className="btn-2 primary mt-4" onClick={handleUpdateStore}>
						Update Store
					</Button>
				</div>
			</div>
		</div>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateStore: (storeDetails) => dispatch(updateStore(storeDetails)),
		showNotification: (message) => dispatch(showNotification(message)),
	};
};

export default connect(null, mapDispatchToProps)(UpdateStore);
