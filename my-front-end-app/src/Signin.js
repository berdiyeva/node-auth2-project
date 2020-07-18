import React, { useState } from "react";
// import axios from "axios";
import api from "./utils/api"

function Signin(props) {
	const [error, setError] = useState();
	const [data, setData] = useState({
		username: "",
		password: "",
		department: "",
	});

	const handleChange = (event) => {
		setData({
			...data,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		api()
			.post("/users", data)
			.then((result) => {
				console.log(result);
			})
			.catch((err) => {
				setError(err.response.data.message);
			});
	};

	return (
		<form onSubmit={handleSubmit} className="form">
			{error && <div>{error}</div>}
			<input
				type='test'
				name='username'
				placeholder='Username'
				value={data.username}
				onChange={handleChange}
			/>
			<input
				type='password'
				name='password'
				placeholder='Password'
				value={data.password}
				onChange={handleChange}
			/>
			<input
				type='text'
				name='department'
				placeholder='department'
				value={data.department}
				onChange={handleChange}
			/>
			<button type='submit'>Sign In</button>
		</form>
	);
}

export default Signin;
