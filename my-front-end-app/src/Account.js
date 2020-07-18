import React, { useState, useEffect } from "react";
import api from "./utils/api";
import axios from "axios"

function Account(props) {
	const [user, setUser] = useState({
		name: "",
		department: "",
	});

	useEffect(() => {
		api()
			.get(`http://localhost:5000/users/${localStorage.getItem("userID")}`)
			.then((result) => {
                console.log(result.data)
				setUser({
					name: result.data.username,
					department: result.data.department,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<>
			<h2>My Account</h2>
			<div>
				<h3>Name: {user.name}</h3>
				<h3>Department: {user.department}</h3>
			</div>
		</>
	);
}

export default Account;
