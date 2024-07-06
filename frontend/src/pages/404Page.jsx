// src/components/NotFound.js
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div style={styles.container}>
			<h1 style={styles.header}>404</h1>
			<p style={styles.paragraph}>Page Not Found</p>
			<Link to="/" style={styles.link}>
				Go to Home
			</Link>
		</div>
	);
};

const styles = {
	container: {
		textAlign: "center",
		marginTop: "20%",
	},
	header: {
		fontSize: "72px",
		margin: "0",
	},
	paragraph: {
		fontSize: "24px",
	},
	link: {
		fontSize: "18px",
		textDecoration: "none",
		color: "blue",
	},
};

export default NotFound;
