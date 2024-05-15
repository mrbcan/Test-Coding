const catchAsync = require("../utils/catchAsync");
const config= require('../dbconfig');
const sql = require("mssql");

exports.getAllOrders = catchAsync(async (req, res, next) => {

    
    let pool = await sql.connect(config);
    let orders = await pool.request().query(`
    SELECT Orders.order_id, Books.title AS book_title, Authors.name AS author, Books.price, OrderDetails.quantity
    FROM Orders
    INNER JOIN OrderDetails ON Orders.order_id = OrderDetails.order_id
    INNER JOIN Books ON OrderDetails.book_id = Books.book_id
    INNER JOIN Authors ON Books.author_id = Authors.author_id
  `);
     res.status(200).json(
       orders.recordset
    );
});



exports.getTotalBookSold = catchAsync(async (req, res, next) => {

    
  let pool = await sql.connect(config);
  let totalBooksSold = await pool.request().query(`
  SELECT SUM(OrderDetails.quantity) AS total_books_sold
  FROM Orders
  INNER JOIN OrderDetails ON Orders.order_id = OrderDetails.order_id
`);
let totalBooksSoldValue = totalBooksSold.recordset[0].total_books_sold;
   res.status(200).json(
    totalBooksSoldValue
  );
});

exports.getTotalRevenue = catchAsync(async (req, res, next) => {

    
  let pool = await sql.connect(config);
  let totalRevenueQuery = await pool.request().query(`
  SELECT SUM(Books.price * OrderDetails.quantity) AS total_revenue
  FROM OrderDetails
  JOIN Books ON OrderDetails.book_id = Books.book_id`);
  let totalRevenue = totalRevenueQuery.recordset[0].total_revenue;
   res.status(200).json(
    totalRevenue
  );
});



exports.getTop5BestSellingBooks = catchAsync(async (req, res, next) => {

    
  let pool = await sql.connect(config);
  let top5BooksQuery = await pool.request().query(`
    SELECT TOP 5 Books.title AS book_title, Authors.name AS author, SUM(OrderDetails.quantity) AS total_quantity_sold
    FROM Orders
    INNER JOIN OrderDetails ON Orders.order_id = OrderDetails.order_id
    INNER JOIN Books ON OrderDetails.book_id = Books.book_id
    INNER JOIN Authors ON Books.author_id = Authors.author_id
    GROUP BY Books.title, Authors.name
    ORDER BY total_quantity_sold DESC
  `);

   res.status(200).json(
    top5BooksQuery.recordset
  );
});







