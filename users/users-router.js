const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("./users-model");
const restrict = require("../middleware/restrict");

const router = express.Router();

router.get("/users", restrict("normal"), async (req, res, next) => {
	try {
		res.json(await Users.get());
	} catch (err) {
		next(err);
	}
});

router.post("/users", async (req, res, next) => {
	try {
		const { username, password, department } = req.body;
		const user = await Users.getBy({ username }).first();

		if (user) {
			return res.status(409).json({
				message: "Username is already taken",
			});
		}

		const newUser = await Users.add({
			username,
			password: await bcrypt.hash(password, 14), //hash the password
			department,
		});

		res.status(201).json(newUser);
	} catch (err) {
		next(err);
	}
});

router.post("/login", async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const user = await Users.getBy({ username }).first();

		if (!user) {
			return res.status(401).json({
				message: "Invalid Credentials",
			});
		}

		// hash the password and compare with the one in db
		const validPass = await bcrypt.compare(password, user.password);

		if (!validPass) {
			return res.status(401).json({
				message: "Invalid Credentials",
			});
		}

		//generate a new token
		const payload = {
			userId: user.id,
			username: user.username,
			userRole: "normal", //this value normally comes from the database, how???
		};

		//add a cookie
		res.cookie("token", jwt.sign(payload, process.env.JWT_SECRET));
		res.json({
			message: `Welcome ${user.username}`,
		});
	} catch (err) {
		next(err);
	}
});

router.get("/logout", async (req, res, next) => {
	try {
		req.session.destroy((err) => {
			if (err) {
				next(err);
			} else {
				res.status(204).end();
			}
		});
	} catch (err) {
		next(err);
	}
});

module.exports = router;
