import React, { useState } from 'react';
import profile1 from '../images/images7.jpg';
import profile2 from '../images/profile2.png';

function Drivers() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [drivers, setDrivers] = useState([
    { id: 'D1000101', name: 'Abishek', contact: '0773423512', email: 'abishek@gmail.com', profile: profile1, type: 'express' },
    { id: 'D1000102', name: 'Sarah', contact: '0776821148', email: 'sarah23@live.it', profile: profile2,type: 'normal' },
    { id: 'D1000103', name: 'John', contact: '0776832145', email: 'john.doe@example.com', profile: profile1 ,type: 'normal'},
    { id: 'D1000104', name: 'Emma', contact: '0776832146', email: 'emma.doe@example.com', profile: profile2 ,type: 'express'},
  ]);
  const [newDriverImage, setNewDriverImage] = useState(null); // Store new profile image
  const [driverId, setDriverId] = useState(""); // New Driver ID state

  const handleAddDriverClick = () => {
    setIsModalOpen(true); // Open modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
  };

  // Generate a new Driver ID by checking the last one and incrementing it
  const generateDriverId = () => {
    const lastDriver = drivers[drivers.length - 1];
    const lastId = lastDriver ? parseInt(lastDriver.id.slice(1)) : 1000100; // Extract numeric part
    const newId = `D${lastId + 1}`; // Increment and return new ID
    return newId;
  };

  const handleAddDriverSubmit = (event) => {
    event.preventDefault();

    const newDriverId = generateDriverId(); // Generate unique Driver ID

    const newDriver = {
      id: newDriverId,
      name: event.target.driverName.value,
      contact: event.target.contact.value,
      email: event.target.email.value,
      profile: newDriverImage || profile1, // Use uploaded image or default image
    };

    // Add the new driver to the list
    setDrivers((prevDrivers) => [...prevDrivers, newDriver]);
    setIsModalOpen(false); // Close the modal after adding the driver
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewDriverImage(reader.result); // Set the uploaded image as the new profile image
      };
      reader.readAsDataURL(file); // Read the file as a data URL (base64)
    }
  };

  return (
    <div className={`driver-page ${isModalOpen ? 'blurred' : ''}`}>
      <h1>Drivers Info. . .</h1>
      <p>Details about drivers for delivery of parcels on time.</p>
      <button type="button" onClick={handleAddDriverClick}>Add New Driver</button>
      
      <table className="driver-table">
        <thead>
          <tr>
            <th>Profile</th>
            <th>Driver ID</th>
            <th>Driver Name</th>
            <th>Contact Number</th>
            <th>Email</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map(driver => (
            <tr key={driver.id}>
              <td><img className="driver-image" src={driver.profile} alt={driver.name} /></td>
              <td>{driver.id}</td>
              <td>{driver.name}</td>
              <td>{driver.contact}</td>
              <td>{driver.email}</td>
              <td>{driver.type}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding a new driver */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Driver</h2>
            <form onSubmit={handleAddDriverSubmit}>
              
              <label>
                Driver ID: <span>{generateDriverId()}</span> {/* Display generated ID */}
              </label>
              <br />
              <label>
                Driver Name:
                <input type="text" name="driverName" required />
              </label>
              <br />
              <label>
                Contact Number:
                <input type="text" name="contact" required />
              </label>
              <br />
              <label>
                Email:
                <input type="email" name="email" required />
              </label>
              <br />
              <label>
                Profile Image:
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </label>
              <br />
              {newDriverImage && <img src={newDriverImage} alt="New Profile" className="preview-image" />}
              <br />

              {/* Buttons in the same row with space */}
              <div className="button-container">
                <button >Add Driver</button>
                <button onClick={handleCloseModal}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Drivers;
