import React, { useState } from "react";
// import axios from "axios";
import api from "./utils/api"

function Login(props) {
	const [error, setError] = useState();
	const [data, setData] = useState({
		username: "",
		password: "",
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
			.post("/login", data)
			.then((result) => {
                console.log(result.data);
                localStorage.setItem("token", result.data.token)
                localStorage.setItem("userID", result.data.userID)
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
			<button type='submit'>Login</button>
		</form>
	);
}

export default Login;
