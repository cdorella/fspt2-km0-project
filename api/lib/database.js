require('dotenv').config();
const mysql = require('mysql');

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
	host: DB_HOST || '127.0.0.1',
	user: DB_USER || 'root',
	password: DB_PASS,
	database: DB_NAME || 'km0_project',
	multipleStatements: true,
});

con.connect(function (err) {
	if (err) throw err;
	console.log('Connected!');

	let createDatabase = 'CREATE DATABASE km0_project;';
	con.query(createDatabase, function (err, result) {
		if (err) throw err;
		console.log('Database creation `km0-project` was successful!');
	});

	// EXAMPLE - TO BE COMPLETED WITH OUR TABLES (IF NOT USING SEQUELIZE)
	// let createEventsQuery =
	// 	"DROP TABLE if exists events; CREATE TABLE events(id INT NOT NULL AUTO_INCREMENT, date DATE NOT NULL, route VARCHAR(40) NOT NULL, PRIMARY KEY (id));";
	// con.query(createEventsQuery, function (err, result) {
	// 	if (err) throw err;
	// 	console.log("Table creation `events` was successful!");
	// });

	con.end();
});
