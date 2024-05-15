const express =require('express');
const orderController=require("../controllers/orderController")
const router =express.Router();
// API/Orders
router.route("/").get(orderController.getAllOrders);
router.route("/getTotalBookSold").get(orderController.getTotalBookSold);
router.route("/getTotalRevenue").get(orderController.getTotalRevenue);
router.route("/getTop5BestSellingBooks").get(orderController.getTop5BestSellingBooks);

  
module.exports= router;