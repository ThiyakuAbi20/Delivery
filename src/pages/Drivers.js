import React, { useState, useEffect } from 'react';
import axios from 'axios';

import profile1 from '../images/user.jpg';  // Adjust the path as necessary
import editIcon from '../images/edit.png';  // Edit icon
import deleteIcon from '../images/delete.png';  // Delete icon

function Drivers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [newDriverImage, setNewDriverImage] = useState(null);
  const [driverType, setDriverType] = useState('normal');
  const [error, setError] = useState(null);
  const [editingDriver, setEditingDriver] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/drivers')
      .then((response) => setDrivers(response.data))
      .catch((error) => console.error('Error fetching drivers:', error));
  }, []);

  const handleAddDriverClick = () => {
    setIsModalOpen(true);
    setEditingDriver(null); // Reset editing state for new driver
  };

  const handleEditDriverClick = (driver) => {
    setEditingDriver(driver);
    setIsModalOpen(true);
  };

  const handleDeleteDriverClick = (driverId) => {
    axios.delete(`http://localhost:3001/drivers/${driverId}`)
      .then(() => {
        setDrivers(drivers.filter(driver => driver.id !== driverId));
      })
      .catch((error) => {
        console.error('Error deleting driver:', error);
        setError('Error deleting driver.');
      });
  };

  const generateDriverId = () => {
    const lastDriver = drivers[drivers.length - 1];
    const lastId = lastDriver ? parseInt(lastDriver.id.slice(1)) : 1000100;
    const newId = `D${lastId + 1}`;
    return newId;
  };

  const handleAddDriverSubmit = (event) => {
    event.preventDefault();
    const newDriverId = editingDriver ? editingDriver.id : generateDriverId();
    const newDriver = {
      id: newDriverId,
      name: event.target.driverName.value,
      contact: event.target.contact.value,
      email: event.target.email.value,
      profile: newDriverImage || profile1,
      type: driverType,
    };

    const request = editingDriver
      ? axios.put(`http://localhost:3001/drivers/${editingDriver.id}`, newDriver) // Update existing driver
      : axios.post('http://localhost:3001/drivers', newDriver); // Add new driver

    request
      .then((response) => {
        if (editingDriver) {
          setDrivers(drivers.map(driver => driver.id === response.data.id ? response.data : driver));
        } else {
          setDrivers([...drivers, response.data]);
        }
        setIsModalOpen(false);
        setError(null);
      })
      .catch((error) => {
        setError(`Error: ${error.response ? error.response.data.message : error.message}`);
      });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewDriverImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTypeChange = (event) => {
    setDriverType(event.target.checked ? 'express' : 'normal');
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
            <th>Contact</th>
            <th>Email</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.id}>
              <td><img className="driver-image" src={driver.profile} alt={driver.name} /></td>
              <td>{driver.id}</td>
              <td>{driver.name}</td>
              <td>{driver.contact}</td>
              <td>{driver.email}</td>
              <td>{driver.type}</td>
              <td>
                <img 
                  src={editIcon} 
                  alt="Edit" 
                  className="action-icon" 
                  onClick={() => handleEditDriverClick(driver)} 
                />
                <img 
                  src={deleteIcon} 
                  alt="Delete" 
                  className="action-icon" 
                  onClick={() => handleDeleteDriverClick(driver.id)} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editingDriver ? 'Edit Driver' : 'Add New Driver'}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleAddDriverSubmit}>
              <label>
                Driver ID: <span>{editingDriver ? editingDriver.id : generateDriverId()}</span>
              </label>
              <br />
              <label>
                Driver Name:
                <input type="text" name="driverName" defaultValue={editingDriver?.name || ''} required />
              </label>
              <br />
              <label>
                Contact:
                <input type="text" name="contact" defaultValue={editingDriver?.contact || ''} required />
              </label>
              <br />
              <label>
                Email:
                <input type="email" name="email" defaultValue={editingDriver?.email || ''} required />
              </label>
              <br />
              <label>
                Profile Image:
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </label>
              <br />
              {newDriverImage && <img src={newDriverImage} alt="New Profile" className="preview-image" />}
              <br />
              <label>
                <input type="checkbox" checked={driverType === 'express'} onChange={handleTypeChange} />
                Tap if express type
              </label>
              <br />
              <div className="button-container">
                <button type="submit">{editingDriver ? 'Update Driver' : 'Add Driver'}</button>
                <button type="button" onClick={() => setIsModalOpen(false)}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Drivers;
