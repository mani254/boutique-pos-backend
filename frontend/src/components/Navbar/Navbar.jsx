import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import "./Navbar.css";
import { MdLogout } from "react-icons/md";
import { logout } from "../../redux/auth/authActions";

function Navbar({ auth, logout }) {
	const { user } = auth;

	if (!user) return null;

	return (
		<nav className="navbar-container">
			<div>
				<div className="d-flex align-items-center">
					<h4 className="m-0 ms-3 mt-3">{user.superAdmin ? "SuperAdmin" : user.store.name}</h4>
				</div>
				<ul className="nav-links mt-4">
					{user.superAdmin && (
						<li>
							<NavLink to="/">Dashboard</NavLink>
						</li>
					)}
					{!user.superAdmin && (
						<li>
							<NavLink to="/billing">Billing</NavLink>
						</li>
					)}
					{user.superAdmin && (
						<li>
							<NavLink to="/stores">Stores</NavLink>
						</li>
					)}
					<li>
						<NavLink to="/customers">Customers</NavLink>
					</li>
					<li>
						<NavLink to="/orders">Orders</NavLink>
					</li>
					{user.superAdmin && (
						<li>
							<NavLink to="/categories">Categories</NavLink>
						</li>
					)}
					{user.superAdmin && (
						<li>
							<NavLink to="/admins">Admins</NavLink>
						</li>
					)}
				</ul>
			</div>

			<div className="admin-wrapper">
				<div className="d-flex align-items-center justify-content-center">
					<p>{user.username}</p>
					{/* <img src="/assets/profile.png" alt="profile-image" /> */}
				</div>
				<div className="d-flex align-items-center justify-content-center">
					<span className="icon" onClick={logout}>
						<MdLogout />
					</span>
				</div>
			</div>
		</nav>
	);
}

const mapStateToProps = (state) => ({
	auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
	logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
