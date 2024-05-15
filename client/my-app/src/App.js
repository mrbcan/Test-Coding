import React,{useEffect,useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [customerData,setCustomerData]=useState([])
  const [totalBooksSoldData,settotalBooksSoldData]=useState([])
  const [totalRevenueData,settotalRevenueData]=useState([])
  const [top5BestSellingBooksData,setTop5BestSellingBooksData]=useState([])
  const [topSpendingCustomersData,settopSpendingCustomersData]=useState([])
  const [orderData,setOrderData]=useState([])

  useEffect(()=>{
      fetch('http://localhost:3100/api/orders')
      .then(response=>response.json())
      .then(data=>setOrderData(data))

      fetch('http://localhost:3100/api/customers')
      .then(response=>response.json())
      .then(data=>setCustomerData(data))

      fetch('http://localhost:3100/api/orders/getTotalBookSold')
      .then(response=>response.json())
      .then(data=>settotalBooksSoldData(data))

      fetch('http://localhost:3100/api/orders/getTotalRevenue')
      .then(response=>response.json())
      .then(data=>settotalRevenueData(data))

      fetch('http://localhost:3100/api/orders/getTop5BestSellingBooks')
      .then(response=>response.json())
      .then(data=>setTop5BestSellingBooksData(data))

      fetch('http://localhost:3100/api/customers/getTopSpendingCustomers')
      .then(response=>response.json())
      .then(data=>settopSpendingCustomersData(data))
  }
  ,[])


  return (
    <div className="container mt-5">
      <h1 className="mb-3">Fetching Data</h1>
      <br></br>
      <br></br>
      <h2>Orders</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {orderData.map((item) => (
            <tr key={item.order_id}>
              <td>{item.book_title}</td>
              <td>{item.author}</td>
              <td>${item.price}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <br></br>
      <h2>Customers</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>          
          </tr>
        </thead>
        <tbody>
          {customerData.map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.address}</td>
            
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <br></br>
      <h2>Top 5 Best-Selling Books</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Book Title</th>
            <th>Quantity Sold</th>
          </tr>
        </thead>
        <tbody>
          {top5BestSellingBooksData.map((item) => (
            <tr key={item.book_id}>
              <td>{item.book_title}</td>
              <td>{item.total_quantity_sold}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <br></br>
      <h2>Top Spending Customers</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Total Spent</th>
          </tr>
        </thead>
        <tbody>
          {topSpendingCustomersData.map((item) => (
            <tr key={item.customer_id}>
              <td>{item.customer_name}</td>
              <td>${item.total_spent}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <br></br>
      <h2>Total Books Sold</h2>
      <div>{totalBooksSoldData}</div>
      <br></br>
      <br></br>
      <h2>Total Revenue</h2>
      <div>${totalRevenueData}</div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>



  );
}

export default App


