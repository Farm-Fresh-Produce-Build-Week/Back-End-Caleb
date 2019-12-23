const express = require("express"),
  server = express(),
  cors = require("cors"),
  helmet = require("helmet"),
  userRoute = require("../users/user-routes"),
  farmerRoute = require("../farmers/farmer-routes"),
  produceRoute = require("../produce/produce-routes"),
  Inventory=require('../farmers/inventory/model.js');
server.use(express.json());
server.use(helmet());
server.use(cors());

server.get("/", (req, res) => {
  res
    .status(200)
    .send(
      `<div><h1>Welcome to the Server for your Build Week!</h1><h2>Click here to view the API <a href="./api">documentation</a></h2></div>`
    );
});
server.get("/api", (req, res) => {
  res.status(200).send(
    `<div>
      <h1>Welcome to the API Documentation</h1>
    </div>`
  );
});
server.use("/api/users", userRoute);
server.use("/api/farmers", farmerRoute);
server.use("/api/produce", produceRoute);
server.get("/api/inventory", (req, res) => {
  Inventory.find()
    .then(items => {
      res.status(200).json(items);
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "Unable to access inventory database!" });
    });
});
module.exports = server;
