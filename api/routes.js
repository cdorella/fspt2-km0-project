const express = require("express");
const routes = express.Router();
var jwt = require("jsonwebtoken");

const db = require("./lib/helper");
require("dotenv").config();

//IMPORT SUPER SECRET FROM .ENV (used to encrypt tokens)
const supersecret = process.env.SUPER_SECRET;

routes.get("/", (req, res) => {
  res.send({
    message: "Hello API",
  });
});

// GET ALL CUISINES
routes.get("/cuisines", (req, res) => {
  db("SELECT * FROM cuisines;")
    .then((results) => {
      if (results.error) {
        res.status(400).send({ message: "There was an error" });
      }
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

// GET ALL RESTAURANTS (CURRENTLY NOT NEEDED)
routes.get("/restaurants", (req, res) => {
  db("SELECT * FROM restaurants;")
    .then((results) => {
      if (results.error) {
        res.status(400).send({ message: "There was an error" });
      }
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

// SEARCH QUERY
routes.get("/search", (req, res) => {
  const { cuisine_name, price } = req.query;

  let dbQuery = `SELECT restaurants.id, restaurants.name, restaurants.address, cuisines.cuisine_name, restaurants.price, restaurants.style FROM restaurants 
	INNER JOIN restaurant_cuisine ON restaurants.id=restaurant_cuisine.restaurantId
	INNER JOIN cuisines ON cuisines.id=restaurant_cuisine.cuisineId `;

  let fields = [];

  if (cuisine_name) {
    fields.push(["cuisine_name", `'${cuisine_name}'`]);
  }
  if (price) {
    fields.push(["price", `'${price}'`]);
  }

  for (let i = 0; i < fields.length; ++i) {
    if (i == 0) {
      dbQuery += ` WHERE ${fields[i][0]} = ${fields[i][1]}`;
    } else {
      dbQuery += ` AND ${fields[i][0]} = ${fields[i][1]}`;
    }
  }

  dbQuery += " ORDER BY restaurants.id ASC;";

  db(dbQuery).then((results) => {
    res.send(results.data);
  });
});

// GET RESTAURANT BY ID
routes.get("/restaurants/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const restaurantData = await db(
      `SELECT restaurants.id, restaurants.name, restaurants.address, restaurants.telephone, restaurants.longitude, restaurants.latitude, cuisines.cuisine_name, restaurants.price, restaurants.style FROM cuisines INNER JOIN restaurant_cuisine ON cuisines.id=restaurant_cuisine.cuisineId INNER JOIN restaurants ON restaurants.id=restaurant_cuisine.restaurantId WHERE restaurants.id = '${id}';`
    );
    const specials = await db(
      `SELECT id, special_name, description FROM specials WHERE restaurantId = ${id}`
    );

    res.send({
      id: restaurantData.data[0].id,
      name: restaurantData.data[0].name,
      address: restaurantData.data[0].address,
      telephone: restaurantData.data[0].telephone,
      longitude: restaurantData.data[0].longitude,
      latitude: restaurantData.data[0].latitude,
      cuisine_name: restaurantData.data[0].cuisine_name,
      price: restaurantData.data[0].price,
      style: restaurantData.data[0].style.split(),
      specials: specials.data,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

// POST LOGIN (PENDING CONFIRMATION JWT AUTHENTICATION)
routes.post("/login", (req, res) => {
  const { username, password } = req.body;
  db(
    `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`
  )
    .then((results) => {
      //CHECK IF THERE IS SOMEONE WITH THESE CREDENTIALS
      if (results.data.length) {
        //yes, there is a user
        //need to generate new token - user ok
        var token = jwt.sign({ id: results.data[0].id }, "supersecret");
        //send token to user
        res.send({ message: "user OK, here is your token", token });
      } else {
        res.status(404).send({ message: "User not found" });
      }
    })
    .catch((err) => res.status(500).send(err));
});

//this endpoint is protected
// router.get('/profile', function (req, res, next) {
// 	//grab the token
// 	const token = req.headers['x-access-token'];
// 	if (!token) {
// 		res.status(401).send({ message: 'Please, log in' });
// 	} else {
// 		//I have the token
// 		jwt.verify(token, supersecret, function (err, decoded) {
// 			if (err) res.status(401).send({ message: err.message });
// 			else {
// 				//everything's good
// 				//send private info to user
// 				const { id } = decoded;
// 				res.send({ message: `Here is the private data for user ${id}` });
// 			}
// 		});
// 	}
// });

// GET USER/OWNER DETAILS (PENDING CONFIRMATION JWT AUTHENTICATION)
// routes.get("/users/:id", (req, res) => {
// 	const { id } = req.params;
// 	db(`SELECT id, username FROM users WHERE id ='${id}';`)
// 		.then(results => {
// 			if (results.error) {
// 				res.status(400).send({ message: "There was an error" });
// 			}
// 			res.send(results.data);
// 		})
// 		.catch(err => res.status(500).send(err));
// });

// GET ALL RESTAURANTS BY USER/OWNER
routes.get("/users/:id/restaurants", (req, res) => {
  const { id } = req.params;
  db(
    `SELECT restaurants.id, restaurants.name, restaurants.address, restaurants.telephone, restaurants.longitude, restaurants.latitude, cuisines.cuisine_name, restaurants.price, restaurants.style FROM cuisines INNER JOIN restaurant_cuisine ON cuisines.id=restaurant_cuisine.cuisineId INNER JOIN restaurants ON restaurants.id=restaurant_cuisine.restaurantId WHERE restaurants.userId = '${id}';`
  )
    .then((results) => {
      if (results.error) {
        res.status(400).send({ message: "There was an error" });
      }
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

// GET SPECIALS BY RESTAURANT
routes.get("/restaurants/:id/specials", async (req, res) => {
  try {
    const { id } = req.params;
    const restaurantData = await db(
      `SELECT restaurants.id, restaurants.name FROM restaurants WHERE restaurants.id ='${id}';`
    );
    const specials = await db(
      `SELECT id, special_name, description FROM specials WHERE restaurantId = ${id}`
    );

    res.send({
      id: restaurantData.data[0].id,
      name: restaurantData.data[0].name,
      specials: specials.data,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

// POST SPECIAL
routes.post("/restaurants/:id/specials", (req, res) => {
  const { special_name, description, restaurantId } = req.body;
  db(
    `INSERT INTO specials (special_name, description, restaurantId) VALUES ('${special_name}','${description}','${restaurantId}');`
  )
    .then((results) => {
      if (results.error) {
        res.status(400).send({ message: "There was an error" });
      }
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

// DELETE SPECIAL
routes.delete("/specials/:id", (req, res) => {
  const { id } = req.params;
  db(`DELETE FROM specials WHERE id=${id};`)
    .then((results) => {
      if (results.error) {
        res.status(400).send({ message: "There was an error" });
      }
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

module.exports = routes;
