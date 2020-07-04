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
	dateStrings: true,
});

con.connect(function (err) {
	if (err) throw err;
	console.log('Connected!');

	let createDatabase = 'CREATE DATABASE km0_project;';
	con.query(createDatabase, function (err, result) {
		if (err) throw err;
		console.log('Database creation `km0_project` was successful!');
	});

	let useDatabase = 'USE km0_project;';
	con.query(useDatabase, function (err, result) {
		if (err) throw err;
		console.log('Connection to `km0_project` database was successful!');
	});

	let createUsersQuery =
		'DROP TABLE if exists users; CREATE TABLE users (id INT NOT NULL AUTO_INCREMENT, username VARCHAR(20) NOT NULL, password VARCHAR(10)NOT NULL, PRIMARY KEY (id));';
	con.query(createUsersQuery, function (err, result) {
		if (err) throw err;
		console.log('Table creation `users` was successful!');
	});

	let createRestaurantsQuery =
		'DROP TABLE if exists restaurants; CREATE TABLE restaurants (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255) NOT NULL, address VARCHAR(255) NOT NULL, telephone VARCHAR(255) NOT NULL, longitude FLOAT NOT NULL, latitude FLOAT NOT NULL, userId INT, price INT NOT NULL, style VARCHAR(255), FOREIGN KEY (userId) REFERENCES users (id), PRIMARY KEY (id));';
	con.query(createRestaurantsQuery, function (err, result) {
		if (err) throw err;
		console.log('Table creation `restaurants` was successful!');
	});

	let createSpecialsQuery =
		'DROP TABLE if exists specials; CREATE TABLE  specials (id INT NOT NULL AUTO_INCREMENT, special_name VARCHAR(255) NOT NULL, description TEXT NOT NULL, restaurantId INT NOT NULL, FOREIGN KEY (restaurantId) REFERENCES restaurants (id), PRIMARY KEY (id));';
	con.query(createSpecialsQuery, function (err, result) {
		if (err) throw err;
		console.log('Table creation `specials` was successful!');
	});

	let createCuisinesQuery =
		'DROP TABLE if exists cuisines; CREATE TABLE cuisines (id INT NOT NULL AUTO_INCREMENT, cuisine_name VARCHAR(255) NOT NULL, PRIMARY KEY (id));';
	con.query(createCuisinesQuery, function (err, result) {
		if (err) throw err;
		console.log('Table creation `cuisines` was successful!');
	});

	let createRestaurantCuisineQuery =
		'DROP TABLE if exists restaurant_cuisine; CREATE TABLE  restaurant_cuisine  (id INT NOT NULL AUTO_INCREMENT, restaurantId INT NOT NULL, cuisineID INT NOT NULL, FOREIGN KEY (restaurantId) REFERENCES restaurants (id), FOREIGN KEY (cuisineId) REFERENCES cuisines(id), PRIMARY KEY (id));';
	con.query(createRestaurantCuisineQuery, function (err, result) {
		if (err) throw err;
		console.log('Table creation `restaurant_cuisine` was successful!');
	});

	con.end();
});
