import React from 'react';
import './App.css';
import logo from './images/logo.png';
import homePage from './images/homePage.png';

function App() {
  return (
    <div className="App">
      <div className="navbar">
      <img src={logo} alt="logo image" />
        <h3>Delivery Portal</h3>
        <ul>
            <li><a href="#drivers">Drivers</a></li>
            <li><a href="#orders">Orders</a></li>
            <li><a href="#contact">Contact Us</a></li>
      </ul>
        <button type = "button">Let's Start</button>
      </div>
      <div className="imagebar">
      <img src={homePage} alt="grocery image" />
      <button type = "button">Find Drivers</button>
      <h4>Quickly identify available drivers to streamline your delivery operations and enhance efficiency.</h4>
      </div>

      <div className='textbar'>
    <div className='text1bar'>
        <h2>Drivers</h2>
        <h1>Our Masterpieces</h1>
        <p>At Northway, we pride ourselves on delivering exceptional service and quality. Our skilled drivers ensure timely deliveries, while our masterpieces showcase the finest craftsmanship and design. Together, they embody our commitment to excellence and customer satisfaction.</p>
    </div>
    <div className='text2bar'>
        <h3>Mission Statement</h3>
        <p>Our mission is to provide our community with fresh, high-quality groceries at competitive prices while prioritizing exceptional customer service. We are committed to supporting local farmers and sustainable practices, ensuring that our customers can find not only the essentials but also unique products that enhance their everyday lives. We strive to create a welcoming environment where customers feel valued and inspired to make healthy choices for themselves and their families.</p>
    </div>
    <div className='text3bar'>
        <h3>Vision Statement</h3>
        <p>Our vision is to be the leading grocery destination in our community, recognized for our commitment to quality, sustainability, and innovation. We envision a shopping experience that fosters community connections, promotes healthy living, and inspires our customers to explore new culinary adventures. By continually evolving and adapting to the needs of our customers, we aim to set the standard for excellence in the grocery industry.</p>
    </div>
</div>
      
    </div>
  );
}

export default App;
