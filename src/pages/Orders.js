import React, { useState, useEffect } from 'react';
import axios from 'axios';

import editIcon from '../images/edit.png';  // Edit icon
import deleteIcon from '../images/delete.png';  // Delete icon

function Orders() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState({
    orderId: '',
    customerName: '',
    contact: '',
    email: '',
    type: 'normal', // Default to 'normal'
  });

  useEffect(() => {
    axios.get('http://localhost:3001/orders')
      .then((response) => {
        // Only set the orders if the data is valid
        if (Array.isArray(response.data)) {
          setOrders(response.data);
        } else {
          console.error('Invalid data format');
          setError('Failed to load orders.');
        }
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
        setError('Error fetching orders.');
      });
  }, []);

  const handleAddOrderClick = () => {
    setIsModalOpen(true);
    setEditingOrder(null); // Reset editing state for new order
    setOrderDetails({
      orderId: '',
      customerName: '',
      contact: '',
      email: '',
      type: 'normal',
    });
  };

  const handleEditOrderClick = (order) => {
    setEditingOrder(order);
    setOrderDetails({
      orderId: order.id,
      customerName: order.customerName,
      contact: order.contact,
      email: order.email,
      type: order.type,
    });
    setIsModalOpen(true);
  };

  const handleDeleteOrderClick = (orderId) => {
    axios.delete(`http://localhost:3001/orders/${orderId}`)
      .then(() => {
        setOrders(orders.filter(order => order.id !== orderId));
      })
      .catch((error) => {
        console.error('Error deleting order:', error);
        setError('Error deleting order.');
      });
  };

  const generateOrderId = () => {
    // Ensure orders is not empty before trying to access the last order
    const lastOrder = orders.length > 0 ? orders[orders.length - 1] : null;
    const lastId = lastOrder ? parseInt(lastOrder.id.slice(1)) : 1000100;  // Default to 1000100 if empty
    const newId = `O${lastId + 1}`;
    return newId;
  };

  const handleAddOrderSubmit = (event) => {
    event.preventDefault();
    const newOrderId = editingOrder ? editingOrder.id : generateOrderId();
    const newOrder = {
      id: newOrderId,
      customerName: orderDetails.customerName,
      contact: orderDetails.contact,
      email: orderDetails.email,
      type: orderDetails.type,
    };

    const request = editingOrder
      ? axios.put(`http://localhost:3001/orders/${editingOrder.id}`, newOrder) // Update existing order
      : axios.post('http://localhost:3001/orders', newOrder); // Add new order

    request
      .then((response) => {
        if (editingOrder) {
          setOrders(orders.map(order => order.id === response.data.id ? response.data : order));
        } else {
          setOrders([...orders, response.data]);
        }
        setIsModalOpen(false);
        setError(null);
      })
      .catch((error) => {
        setError(`Error: ${error.response ? error.response.data.message : error.message}`);
      });
  };

  const handleTypeChange = (event) => {
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      type: event.target.checked ? 'express' : 'normal',
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div className={`order-page ${isModalOpen ? 'blurred' : ''}`}>
      <h1>Orders Info. . .</h1>
      <p>Details about customer orders.</p>
      <button type="button" onClick={handleAddOrderClick}>Add New Order</button>

      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customerName}</td>
              <td>{order.contact}</td>
              <td>{order.email}</td>
              <td>{order.type}</td>
              <td>
                <img 
                  src={editIcon} 
                  alt="Edit" 
                  className="action-icon" 
                  onClick={() => handleEditOrderClick(order)} 
                />
                <img 
                  src={deleteIcon} 
                  alt="Delete" 
                  className="action-icon" 
                  onClick={() => handleDeleteOrderClick(order.id)} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editingOrder ? 'Edit Order' : 'Add New Order'}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleAddOrderSubmit}>
              <label>
                Order ID: <span>{editingOrder ? editingOrder.id : generateOrderId()}</span>
              </label>
              <br />
              <label>
                Customer Name:
                <input 
                  type="text" 
                  name="customerName" 
                  value={orderDetails.customerName} 
                  onChange={handleInputChange} 
                  required 
                />
              </label>
              <br />
              <label>
                Contact:
                <input 
                  type="text" 
                  name="contact" 
                  value={orderDetails.contact} 
                  onChange={handleInputChange} 
                  required 
                />
              </label>
              <br />
              <label>
                Email:
                <input 
                  type="email" 
                  name="email" 
                  value={orderDetails.email} 
                  onChange={handleInputChange} 
                  required 
                />
              </label>
              <br />
              <label>
                <input 
                  type="checkbox" 
                  checked={orderDetails.type === 'express'} 
                  onChange={handleTypeChange} 
                />
                Tap if express type
              </label>
              <br />
              <div className="button-container">
                <button type="submit">{editingOrder ? 'Update Order' : 'Add Order'}</button>
                <button type="button" onClick={() => setIsModalOpen(false)}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
