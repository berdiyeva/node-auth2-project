const db = require("../database/config");

async function get() {
	return db("users").select("id", "username", "department");
}

async function add(user) {
	const [id] = await db("users").insert(user);
	return getById(id);
}

function getBy(filter) {
	return db("users").select("id", "username", "password").where(filter);
}

function getById(id) {
	return db("users").select("id", "username", "department" ).where({ id }).first();
}

function getByDep(dep) {
	return db("users").select("id", "username", "department" ).where("department", dep)
}

module.exports = {
	get,
	add,
	getBy,
	getById,
	getByDep
};
