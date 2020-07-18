import React from "react";
import "./App.css";
import { Link, Route } from "react-router-dom";
import Signin from "./Signin";
import Login from "./Login";
import Account from "./Account"

function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				<h2>Welcome to Auth Project</h2>
			</header>

			<nav>
				<Link className='App-link' to='/'>
					Home
				</Link>
				<Link className='App-link' to='/register'>
					Sign In
				</Link>
				<Link className='App-link' to='/login'>
					Login
				</Link>
				<Link className='App-link' to='/account'>
					Account
				</Link>
			</nav>
			<Route exact path='/register' component={Signin} />
			<Route exact path='/login' component={Login} />
			<Route exact path='/account' component={Account} />
		</div>
	);
}

export default App;
