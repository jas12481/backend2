// This file will deal with the customer table.
const database = require("./database");
const express = require("express");

var router = express.Router();

router.get(`/customer/all`, get_all_customers);
router.get(`/customer/by-cid`, get_customer_by_id);
router.post(`/customer/add`, add_new_customer);

function get_all_customers(request, response) {
  database.connection.query(
    "select * from customers", // query in string format
    (error, results) => {
      if (error) {
        response.status(500).send("Server error");
        console.log(error);
      } else {
        response.status(200).send(results);
        console.log(results);
      }
    }
  );
}

function get_customer_by_id(request, response) {
  database.connection.query(
    `select * from customers where id = ${request.query.id}`,
    (error, results) => {
      if (error) {
        response.status(500).send("Server error");
        console.log(error);
      } else {
        response.status(200).send(results);
        console.log(results);
      }
    }
  );
}

function add_new_customer(request, response) {
  database.connection.query(
    `insert into customers (type, name, email, wallet, tolerance) values (
      '${request.body.type}', 
      '${request.body.name}',
      '${request.body.email}',
      '${request.body.wallet}',
      '${request.body.tolerance}')`,
    (error, results) => {
      if (error) {
        response.status(500).send("Server error");
        console.log(error);
      } else {
        response.status(200).send("Added successfully");
        console.log("Added!");
      }
    }
  );
}

function update_wallet_by_id(id, wallet) {
  database.connection.query(
    `update customers set wallet = ${wallet} where id = ${id}`,
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Updated!");
      }
    }
  );
}

function delete_customer_by_id(id) {
  database.connection.query(
    `delete from customers where id = ${id}`,
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Deleted!");
      }
    }
  );
}

module.exports = {
  router,
};
