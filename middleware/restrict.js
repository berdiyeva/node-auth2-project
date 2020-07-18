const jwt = require("jsonwebtoken");

const roles = ["normal", "admin"]; //higher up in array the lower the role is

function restrict(role) {
	return async (req, res, next) => {
		const authError = {
			message: "Invalid credentials",
		};

		try {
			//once we added cookies need to change the request address
			// const token = req.cookies.token;
			const token = req.headers.token;

			if (!token) {
				return res.status(401).json(authError);
			}

			jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
				if (err) {
					return res.status(401).json(authError);
				}

				// if there are many roles:
				if (role && roles.indexOf(decoded.userRole) < roles.indexOf(role)) {
					return res.status(401).json(authError);
				}

				next();
			});
		} catch (err) {
			next(err);
		}
	};
}

module.exports = restrict;
