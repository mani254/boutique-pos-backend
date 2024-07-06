// src/components/ServerDown.js
import React from "react";
import { Link } from "react-router-dom";

const ServerDown = () => {
	return (
		<div style={styles.container}>
			<h1 style={styles.header}>500</h1>
			<p style={styles.paragraph}>Server is Down</p>
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

export default ServerDown;
