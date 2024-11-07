import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import logo from './images/logo1.png';
import homePage from './images/homePage.png';
import brand1 from './images/brand1.png';
import brand2 from './images/brand2.png';
import brand3 from './images/brand3.png';
import brand4 from './images/brand4.png';
import social1 from './images/facebook.png.jpg';
import social2 from './images/Youtube-logo.png.jpg';
import social3 from './images/instagram.png.jpg';
import social4 from './images/whatsapp.png.jpg';
import address from './images/address.png';
import email from './images/email.png';
import phone from './images/phone.png';
import driver from './images/driver-home.png';

// Import your page components
import Drivers from './pages/Drivers';
import Orders from './pages/Orders';
import Tracking from './pages/Tracking';

function App() {
  const images = [brand1, brand2, brand3, brand4];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Router>
      <div className="header">
        <div className="App">
          <div className="navbar">
            <img src={logo} alt="logo image" />
            <h3><Link to="/">Delivery Portal</Link></h3>
            <ul>
              <li><Link to="/drivers">Drivers</Link></li>
              <li><Link to="/orders">Orders</Link></li>
              <li><Link to="/tracking">Tracking</Link></li>
            </ul>
            <button type="button">Let's Start</button>
          </div>
        </div>

        {/* Main content area */}
        <Routes>
          <Route path="/" element={
            <>
              <div className="imagebar">
                <img src={homePage} alt="grocery image" />
                <button type="button">Find Drivers</button>
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

              <div className='form-and-slider'>
                <div className='Formstyle'>
                  <h2>Add Your Driver Review . . .</h2>
                  <form>
                    <label htmlFor="review">Your Driver Review :</label>
                    <textarea id="review" name="review" rows="4" cols="50" placeholder="Write your review here..."></textarea>

                    <label htmlFor="name">Name :</label>
                    <input type="text" id="name" name="name" placeholder="Enter your name" required />

                    <label htmlFor="email">Email :</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email" required />

                    <button type="submit">Add Review</button>
                  </form>
                </div>

                <div className='imageslider'>
                  <img src={images[currentIndex]} alt={`brand${currentIndex + 1}`} className="slider-image" />
                </div>
              </div>
            </>
          } />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/tracking" element={<Tracking />} />
        </Routes>
      </div>
      
      <div className='footer'>
        <div className='footer-content'>
          <div className='left-section'>
            <h4>Follow Us</h4>
            <div className='social-icons'>
              <a href="https://web.facebook.com/northwayfamilymart/?_rdc=1&_rdr" target="_blank" rel="noopener noreferrer">
                <img className='img1' src={social1} alt="Facebook" />
              </a>
              <a href="https://web.facebook.com/watch/?v=399479423869428" target="_blank" rel="noopener noreferrer">
                <img className='img2' src={social2} alt="YouTube" />
              </a>
              <a href="https://www.instagram.com/explore/locations/338507396633298/northway-family-mart/" target="_blank" rel="noopener noreferrer">
                <img className='img3' src={social3} alt="Instagram" />
              </a>
              <a href="https://wa.me/0777647645" target="_blank" rel="noopener noreferrer">
                <img className='img4' src={social4} alt="WhatsApp" />
              </a>
            </div>
            <button className='contact-button' type="button">Contact Us</button>
          </div>

          <div className='right-section contact-info'>
            <div className='address'>
              <img src={address} alt="Location icon" />
              <p>184, Parameswara Junction, Thirunelvely, Jaffna</p>
            </div>
            <div className='phone'>
              <img src={phone} alt="Phone icon" />
              <p>0212226002</p>
            </div>
            <div className='email'>
              <img src={email} alt="Email icon" />
              <p>northwayfamilymart18@gmail.com</p>
            </div>
          </div>
          <div className='driver-image'>
            <img src={driver} alt="Driver image" />
          </div>
        </div>

        <div className='footer-bottom'>
          <p>&copy; 2024 Northway Family Mart. All rights reserved.</p>
        </div>
      </div>
     
    </Router>
  );
}

export default App;
