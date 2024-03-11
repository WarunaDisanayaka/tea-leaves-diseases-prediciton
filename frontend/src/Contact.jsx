import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields (you can add more validation logic)
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError('All fields are required');
      return;
    }

    // Make an API call to handle the form submission
    axios.post('http://localhost:8081/contactUs', formData)
      .then((res) => {
        if (res.data.Status === 'Success') {
          Swal.fire('Success', 'Your message has been sent successfully!', 'success');
          // Clear the form after successful submission
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
          });
        } else {
          setError('Error submitting the form. Please try again later.');
        }
      })
      .catch((err) => {
        setError('An error occurred while submitting the form. Please try again later.');
        console.error('Error:', err.message);
      });
  };

  return (
    <div className="container-fluid mt-5 add-users">
      <h1 className="text-center">Contact Us</h1>
      <div className="row justify-content-center">
        <div className="col-md-6 mt-3">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                className="form-control"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                className="form-control"
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </div>
            {error && <span className="error-text">{error}</span>}
            <div className="mt-3 mb-4 text-center">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
