const express =require('express');
const customerController=require("../controllers/customerController")
const router =express.Router();
// API/customers
router.route("/").get(customerController.getAllCustomers);
router.route("/getTopSpendingCustomers").get(customerController.getTopSpendingCustomers);

  
module.exports= router;