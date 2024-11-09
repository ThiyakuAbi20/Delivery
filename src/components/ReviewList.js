import React, { useState, useEffect } from 'react';
import deleteIcon from '../images/delete.png';  // Delete icon

function ReviewList() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:3001/reviews');
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  // Delete a review
  const deleteReview = async (id) => {
    try {
      await fetch(`http://localhost:3001/reviews/${id}`, { method: 'DELETE' });
      setReviews(reviews.filter((review) => review._id !== id));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <div className='ReviewList'>
      <h2>Driver Reviews . . .</h2>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index}>
            <p><strong>Review:</strong> {review.review}</p>
            <p><strong>Name:</strong> {review.name}</p>
            <p><strong>Email:</strong>{review.email}</p>
            <p><strong>Date:</strong> {new Date(review.date).toLocaleDateString()}</p>
            <button onClick={() => deleteReview(review._id)} className="delete-button">
            <img src={deleteIcon} alt="Delete" className="delete-icon" />
            </button>
            <hr />
          </div>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
}

export default ReviewList;
