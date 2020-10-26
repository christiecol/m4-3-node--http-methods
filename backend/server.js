"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { customers, stock } = require("./data/inventory");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(bodyParser.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
  .post("/order", (req, res) => {
    let error = null;
    const order = req.body.order;
    const size = req.body.size;
    const firstName = req.body.givenName;
    const lastName = req.body.surname;
    const email = req.body.email;
    const address = req.body.address;
    const country = req.body.country;
    // console.log(firstName);
    //
    const bottle = stock.bottle;
    const socks = stock.socks;
    const smallShirt = stock.shirt.small;
    const mediumShirt = stock.shirt.medium;
    const largeShirt = stock.shirt.large;
    const xlargeShirt = stock.shirt.xlarge;
    //
    // let objValBottleSocks = Object.values(stock);
    // let objValTshirts = Object.values(stock.shirt);
    // console.log(objValBottleSocks, objValTshirts);

    console.log(req.body);
    customers.forEach((customer) => {
      console.log(socks, order);
      if (
        customer.givenName.toLowerCase() === firstName.toLowerCase() &&
        customer.surname.toLowerCase() === lastName.toLowerCase() &&
        customer.email.toLowerCase() === email.toLowerCase() &&
        customer.address.toLowerCase() === address.toLowerCase()
      ) {
        error = "repeat-customer";
      }
      if (!email.toLowerCase().includes("@")) {
        error = "missing-data";
      }
      if (country.toLowerCase() != "canada") {
        error = "undeliverable";
      }
      if (
        (order === "socks" && socks === "0") ||
        (order === "bottle" && bottle === "0")
      ) {
        error = "unavailable";
      }
      if (
        (order === "tshirt" && size === smallShirt && smallShirt === "0") ||
        (size === "medium" && mediumShirt === "0") ||
        (size === "large" && largeShirt === "0") ||
        (size === "xlarge" && xlargeShirt === "0")
      ) {
        error = "unavailable";
      }
    });
    if (error) {
      res.status(400).json({
        status: "error",
        error,
      });
    } else {
      res.status(200).json({
        status: "success",
      });
    }
  })

  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
