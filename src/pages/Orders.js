import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newOrder, setNewOrder] = useState({
    customerName: '',
    deliveryAddress: '',
    orderDate: '',
    driverType: '',
  });

  // Fetch drivers and orders from the API
  useEffect(() => {
    axios.get('http://localhost:3001/drivers')
      .then((response) => {
        setDrivers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching drivers:', error);
      });

    axios.get('http://localhost:3001/orders')
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  // Function to handle assigning driver based on order type
  const assignDriver = (orderId, driverType) => {
    const availableDriver = drivers.find(driver => driver.type === driverType && !driver.assigned);

    if (availableDriver) {
      axios.put(`http://localhost:3001/orders/${orderId}`, {
        driver: availableDriver._id,
      })
      .then(() => {
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order._id === orderId ? { ...order, driver: availableDriver._id } : order
          )
        );
        setDrivers(prevDrivers =>
          prevDrivers.map(driver =>
            driver._id === availableDriver._id ? { ...driver, assigned: true } : driver
          )
        );
      })
      .catch((error) => {
        console.error('Error assigning driver:', error);
      });
    } else {
      alert('No available driver of the required type!');
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({
      ...newOrder,
      [name]: value,
    });
  };

  // Handle form submission to add new order
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/orders', newOrder)
      .then((response) => {
        setOrders(prevOrders => [...prevOrders, response.data]);
        setNewOrder({
          customerName: '',
          deliveryAddress: '',
          orderDate: '',
          driverType: '',
        });
        setShowForm(false);
      })
      .catch((error) => {
        console.error('Error adding order:', error);
      });
  };

  return (
    <div className="orders-container">
      <h1 className="orders-header">Orders List</h1>

      {/* Button to toggle form visibility */}
      <button onClick={() => setShowForm(!showForm)} className="add-order-button">
        {showForm ? 'Cancel' : 'Add Order'}
      </button>

      {/* New Order Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="add-order-form">
          <div>
            <label>Customer Name:</label>
            <input
              type="text"
              name="customerName"
              value={newOrder.customerName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Delivery Address:</label>
            <input
              type="text"
              name="deliveryAddress"
              value={newOrder.deliveryAddress}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Order Date:</label>
            <input
              type="date"
              name="orderDate"
              value={newOrder.orderDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Order Type:</label>
            <select
              name="driverType"
              value={newOrder.driverType}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Driver Type</option>
              <option value="normal">Normal</option>
              <option value="express">Express</option>
            </select>
          </div>
          <button type="submit" className="submit-order-button">Add Order</button>
        </form>
      )}

      {/* Orders Table */}
      <table className="orders-table">
        <thead>
          <tr className="orders-table-header">
            <th className="orders-table-cell">Order ID</th>
            <th className="orders-table-cell">Customer Name</th>
            <th className="orders-table-cell">Delivery Address</th>
            <th className="orders-table-cell">Order Date</th>
            <th className="orders-table-cell">Order Type</th>
            <th className="orders-table-cell">Driver</th>
            <th className="orders-table-cell">Assign Driver</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="orders-table-row">
              <td className="orders-table-cell">{order._id}</td>
              <td className="orders-table-cell">{order.customerName}</td>
              <td className="orders-table-cell">{order.deliveryAddress}</td>
              <td className="orders-table-cell">{order.orderDate}</td>
              <td className="orders-table-cell">{order.driverType}</td>
              <td className="orders-table-cell">
                {order.driver ?
                  drivers.find(d => d._id === order.driver)?.name :
                  'Not Assigned'}
              </td>
              <td className="orders-table-cell">
                <button
                  onClick={() => assignDriver(order._id, order.driverType)}
                  className="orders-assign-button"
                  disabled={order.driver} // Disable button if driver already assigned
                >
                  Assign Driver
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
