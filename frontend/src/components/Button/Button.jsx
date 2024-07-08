import React from "react";

const Button = ({ onClick, children, className, ...otherProps }) => {
	return (
		<button onClick={onClick} className={`${className}`} {...otherProps}>
			{children}
		</button>
	);
};

export default Button;
