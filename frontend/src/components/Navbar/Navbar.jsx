import React from "react";
import { NavLink } from "react-router-dom";

import "./Navbar.css";

function Navbar() {
	return (
		<nav className="navbar-container">
			<div>
				<div className="d-flex align-items-center">
					{/* <img className="logo" src="/assets/logo.png" alt="logo" /> */}
					<h4 className="m-0 ms-3 mt-3">Sruthi Boutique</h4>
				</div>
				<ul className="nav-links mt-4">
					<li>
						<NavLink to="/dashboard">Dashboard</NavLink>
					</li>
					<li>
						<NavLink to="/billing">Billing</NavLink>
					</li>
					<li>
						<NavLink to="/stores">Stores</NavLink>
					</li>
					<li>
						<NavLink to="/customers">Customers</NavLink>
					</li>
					<li>
						<NavLink to="/categories">Categories</NavLink>
					</li>
					<li>
						<NavLink to="/admins">Admins</NavLink>
					</li>
				</ul>
			</div>

			<div className="admin-wrapper d-flex align-items-center justify-content-center">
				<p>AdminName</p>
				<img src="/assets/profile.png" alt-="profile-image" />
			</div>
		</nav>
	);
}

export default Navbar;
