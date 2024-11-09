import React, { useState } from 'react';

function ReviewForm() {
  const [reviewData, setReviewData] = useState({
    review: '',
    name: '',
    email: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        setMessage('Review added successfully');
        setReviewData({ review: '', name: '', email: '' });
      } else {
        setMessage('Failed to add review');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error adding review');
    }
  };

  return (
    <div className='Formstyle'>
      <h2>Add Your Driver Review</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="review">Your Driver Review:</label>
        <textarea 
          id="review" 
          name="review" 
          rows="4" 
          cols="50" 
          placeholder="Write your review here..."
          value={reviewData.review}
          onChange={handleChange}
        />

        <label htmlFor="name">Name:</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          placeholder="Enter your name" 
          value={reviewData.name}
          onChange={handleChange}
          required 
        />

        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          placeholder="Enter your email" 
          value={reviewData.email}
          onChange={handleChange}
          required 
        />

        <button type="submit" >Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ReviewForm;
