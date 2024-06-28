import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import "./Categories.css";

import Button from "../Button/Button.jsx";
import ConfirmationAlert from "../ConfirmationAlert/ConfirmationAlert.jsx";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TextInput, SelectInput } from "../FormComponents/FormComponents.jsx";

import { addCategory, getCategories, updateCategory, deleteCategory } from "../../redux/categories/categoryActions.js";
import { showModal } from "../../redux/modal/modalActions.js";



function Categories({ categoriesData, addCategory, getCategories, updateCategory, deleteCategory, showModal }) {
	const [addCategoryVisible, setAddCategoryVisible] = useState(false);
	const [updateCategoryVisible, setUpdateCategoryVisible] = useState(false);
	const [categoryData, setCategoryData] = useState({ name: "", status: true });

	const alertData = {
		info: "if you delete the category all the orders within this category will be unallocated.",
		confirmFunction: (categoryId) => {
			deleteCategory(categoryId);
		},
	};

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				await getCategories();
			} catch (err) {
				console.error("Error while fetching categories:", err.response ? err.response.data.error : "Network Error");
			}
		};
		fetchCategories();
	}, [getCategories]);

	function handleChange(e) {
		const { name, value } = e.target;
		setCategoryData((prev) => ({ ...prev, [name]: value }));
	}

	async function handleAddCategory() {
		try {
			await addCategory(categoryData);
			setAddCategoryVisible(false);
			setCategoryData({ name: "", value: true });
		} catch (err) {
			console.log(err.message);
			console.error("Error while adding the City:", err.response ? err.response.data.error : "Network Error");
		}
	}

	function handleStatusUpdate() {
		return null;
	}

	function updateCategoryFun(category) {
		return null;
	}

	function handleUpdateCategory() {
		return null;
	}

	return (
		<div className="backend-container category-container">
			<div className="d-flex align-items-center justify-content-between ">
				<h2>Categories</h2>
				<Button
					className="btn-2 primary"
					onClick={() => {
						setAddCategoryVisible(!addCategoryVisible);
						setUpdateCategoryVisible(false);
						setCategoryData({ name: "", status: true });
					}}>
					Add Category
				</Button>
			</div>
			<hr />

			{categoriesData.categories.length < 1 && !addCategoryVisible && <h2 className="text-center mt-5">No Categories are added</h2>}

			<table className="mt-4">
				{console.log(categoriesData.categories.length >= 1)}

				<thead>
					<tr>
						<th>Name</th>
						<th>Status</th>
						<th>Actions</th>
					</tr>
				</thead>

				<tbody>
					{categoriesData.categories.length >= 1 && (
						<>
							{categoriesData.categories.map((category) => (
								<tr key={category._id}>
									<td>{category.name}</td>
									<td>
										<div className={`toggle-switch ${category.status && "active"}`} onClick={() => handleStatusUpdate(category)}>
											<div className="toggle-switch-background">
												<div className="toggle-switch-handle"></div>
											</div>
										</div>
									</td>
									<td>
										<span className="icon edit-icon" onClick={() => updateCategoryFun(category)}>
											<FaEdit />
										</span>
										<span className="icon delete-icon" onClick={() => showModal({ ...alertData, id: category._id }, ConfirmationAlert)}>
											<MdDelete />
										</span>
									</td>
								</tr>
							))}
						</>
					)}

					{(addCategoryVisible || updateCategoryVisible) && (
						<tr className="addcategory-border">
							<td>
								<TextInput type="text" name="name" label="Category-Name:" value={categoryData.name} variant="variant-1" onChange={handleChange} required />
							</td>

							<td>
								<SelectInput
									options={[
										{ value: true, label: "Active" },
										{ value: false, label: "InActive" },
									]}
									label="Status:"
									id="category-status"
									defaultValue={categoryData.status}
									variant="variant-1"
									name="status"
									onChange={handleChange}
									required
								/>
							</td>
							<td>
								{addCategoryVisible && !updateCategoryVisible && (
									<Button className="btn-2 primary" onClick={handleAddCategory}>
										Add
									</Button>
								)}
								{updateCategoryVisible && (
									<Button className="btn-2 primary" onClick={handleUpdateCategory}>
										Update
									</Button>
								)}
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}

const mapStateToProps = (state) => ({
	categoriesData: state.category,
});

const mapDispatchToProps = (dispatch) => ({
	addCategory: (categoryData) => dispatch(addCategory(categoryData)),
	getCategories: () => dispatch(getCategories()),
	updateCategory: (categoryData) => dispatch(updateCategory(categoryData)),
	deleteCategory: (categoryId) => dispatch(deleteCategory(categoryId)),
	showModal: (props, component) => dispatch(showModal(props, component)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
