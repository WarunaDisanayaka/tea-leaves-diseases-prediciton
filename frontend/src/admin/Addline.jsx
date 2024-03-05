import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

function Addline() {
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
  
    if (selectedImage) {
      const allowedTypes = ['image/jpeg', 'image/png']; // Add more types if needed
  
      // Check if the selected file type is allowed
      if (allowedTypes.includes(selectedImage.type)) {
        setImage(selectedImage);
        setError('');
      } else {
        setImage(null);
        setError('Please select a valid image file (JPEG, PNG, GIF).');
      }
    } else {
      setImage(null);
      setError('Please select an image.');
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (image) {
      const formData = new FormData();
      formData.append('image', image);

      axios
        .post('http://localhost:8081/uploadImage', formData) // Update the API endpoint
        .then((res) => {
          if (res.data.status === 'success') {
            console.log('Image uploaded successfully.');
            Swal.fire('Success', 'Image uploaded successfully.', 'success');
          } else {
            console.log('Error:', res.data.error);
          }
        })
        .catch((err) => {
          console.log('An error occurred:', err.message);
        });
    } else {
      setError('Please select an image before submitting.');
    }
  };

  return (
    <div className="container-fluid mt-5 add-users">
      <h1 className="text-center">Scan Diseases</h1>
      <div className="row justify-content-center">
        <div className="col-md-6 mt-3">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Upload your image</label>
              <input type="file" className="form-control-file" accept="image/*" onChange={handleImageChange} />
              {error && <span className="error-text">{error}</span>}
            </div>
            <div className="mt-3 mb-4 text-center">
              <button type="submit" className="btn btn-primary">
                Scan Image
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Addline;
