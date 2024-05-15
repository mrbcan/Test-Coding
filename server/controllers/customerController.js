const catchAsync = require("../utils/catchAsync");
const config= require('../dbconfig');
const sql = require("mssql");

exports.getAllCustomers = catchAsync(async (req, res, next) => {

    
    let pool = await sql.connect(config);
    let customers = await pool.request().query(`
    SELECT name, email, address
    FROM Customers
  `);
    res.status(200).json(
        customers.recordset
    );
});


exports.getTopSpendingCustomers = catchAsync(async (req, res, next) => {

    
  let pool = await sql.connect(config);
  let topSpendingCustomersQuery = await pool.request().query(`
    SELECT Customers.customer_id, Customers.name AS customer_name, SUM(Books.price * OrderDetails.quantity) AS total_spent
    FROM Orders
    INNER JOIN OrderDetails ON Orders.order_id = OrderDetails.order_id
    INNER JOIN Books ON OrderDetails.book_id = Books.book_id
    INNER JOIN Customers ON Orders.customer_id = Customers.customer_id
    GROUP BY Customers.customer_id, Customers.name
    ORDER BY total_spent DESC
  `);

   res.status(200).json(
    topSpendingCustomersQuery.recordset
  );
});