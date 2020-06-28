const express = require("express");
const db = require("./lib/helper");
const routes = express.Router();

routes.get("/", (req, res) => {
	res.send({
		message: "Hello API",
	});
});

// EXAMPLE - TO BE COMPLETED WITH OUR ROUTES
// routes.get("/restaurants", (req, res) => {
// 	db("SELECT * FROM restaurants;").then(results => {
// 		if (results.error) {
// 			res.status(400).send({ message: "There was an error" });
// 		}
// 		res.send(results.data);
// 	});
// });

module.exports = routes;
