import React, { useState, useEffect } from 'react';
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

import Drivers from './pages/Drivers';
import Orders from './pages/Orders';
import Tracking from './pages/Tracking';
import ReviewForm from './components/ReviewForm';
import ReviewList from './components/ReviewList';

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
          <nav className="navbar">
            <img src={logo} alt="logo" />
            <h3><Link to="/">Delivery Portal</Link></h3>
            <ul>
              <li><Link to="/drivers">Drivers</Link></li>
              <li><Link to="/orders">Orders</Link></li>
              <li><Link to="/tracking">Tracking</Link></li>
            </ul>
            <button type="button">Let's Start</button>
          </nav>
        </div>

        <Routes>
          <Route path="/" element={
            <>
              <div className="imagebar">
                <img src={homePage} alt="grocery" />
                <button type="button">Find Drivers</button>
                <h4>Quickly identify available drivers to streamline your delivery operations and enhance efficiency.</h4>
              </div>

              <div className='form-and-slider'>
                <ReviewForm />
                <div className='imageslider'>
                  <img src={images[currentIndex]} alt={`brand${currentIndex + 1}`} className="slider-image" />
                </div>
              </div>

              <ReviewList />
            </>
          } />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/tracking" element={<Tracking />} />
        </Routes>
      </div>

      <footer className='footer'>
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
          <p>© 2024 All Rights Reserved. Northway Family Mart</p>
        </div>
      </footer>
    </Router>
  );
}

export default App;
