import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchComponent.css";

function SearchComponent({ value, onSearch, name, variant, ...props }) {
	const [query, setQuery] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			onSearch(query);
		}, 600);

		return () => {
			clearTimeout(handler);
		};
	}, [query, onSearch]);

	const handleChange = (event) => {
		setQuery(event.target.value);
	};
	return (
		<div className={`form-input search-input ${variant}`}>
			<span className="search-wrapper">
				<input type="text" value={query} onChange={handleChange} placeholder="Search Order" />
				<span className="icon">
					<FaSearch />
				</span>
			</span>
		</div>
	);
}

export default SearchComponent;
