import React, { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./FormComponents.css";

function TextInput({ label, variant, name, ...props }) {
	return (
		<div className={`form-input input-wrapper ${variant}`}>
			<label htmlFor={name}>{label}</label>
			<input type="text" id={name} name={name} {...props} />
		</div>
	);
}

function NumberInput({ label, variant, name, ...props }) {
	return (
		<div className={`form-input input-wrapper ${variant}`}>
			<label htmlFor={name}>{label}</label>
			<input type="number" id={name} name={name} {...props} />
		</div>
	);
}

function SelectInput({ label, variant, name, options, defaultValue, ...props }) {
	return (
		<div className={`form-input select-wrapper ${variant}`}>
			{label && <label htmlFor={name}>{label}</label>}
			<select id={name} name={name} defaultValue={defaultValue} {...props}>
				{options.map((option, index) => (
					<option key={index} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
}

function TextArea({ label, variant, name, ...props }) {
	return (
		<div className={`form-input input-wrapper ${variant}`}>
			<label htmlFor={name}>{label}</label>
			<textarea id={name} name={name} {...props}></textarea>
		</div>
	);
}

function TelInput({ label, variant, name, ...props }) {
	return (
		<div className={`form-input input-wrapper ${variant}`}>
			<label htmlFor={name}>{label}</label>
			<input type="tel" id={name} name={name} {...props} />
		</div>
	);
}

function PasswordInput({ label, variant, name, ...props }) {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<div className={`form-input password-input ${variant}`}>
			<label htmlFor={name}>{label}</label>
			<span className="password-wrapper">
				<input type={`${showPassword ? "text" : "password"}`} id={name} name={name} {...props} />
				<span className="icon" onClick={() => setShowPassword(!showPassword)}>
					{showPassword ? <FaEyeSlash /> : <FaEye />}
				</span>
			</span>
		</div>
	);
}

function Checkbox({ label, variant, name, ...props }) {
	return (
		<div className={`form-input input-wrapper ${variant}`}>
			<input type="checkbox" id={name} name={name} {...props} />
			<label htmlFor={name}>{label}</label>
		</div>
	);
}

function RadioButton({ label, variant, name, value, ...props }) {
	return (
		<div className={`form-input input-wrapper ${variant}`}>
			<input type="radio" id={value} name={name} value={value} {...props} />
			<label htmlFor={value}>{label}</label>
		</div>
	);
}

function FileInput({ label, id, variant, children, value = "null", ...otherProps }) {
	const fileInputRef = useRef(null);
	return (
		<div className={`form-input file-input ${variant}`}>
			<label htmlFor={id}>{label}</label>
			<input id={id} ref={fileInputRef} {...otherProps} />
			{variant === "variant-1" && (
				<button
					onClick={() => {
						fileInputRef.current.click();
					}}>
					{value ? value : "select file"}
				</button>
			)}
			{children}
		</div>
	);
}

export { TextInput, NumberInput, SelectInput, TextArea, TelInput, RadioButton, Checkbox, PasswordInput, FileInput };
