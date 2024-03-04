import './App.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Registration() {
   const [values, setValues] = useState({
      username: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
   });

   const navigate = useNavigate();
   axios.defaults.withCredentials = true;
   const [error, setError] = useState('');
   const [errors, setErrors] = useState({});

   const handleSubmit = (event) => {
      event.preventDefault();
      const newErrors = {};

      if (!values.username) {
         newErrors.username = 'Username is required';
      }

      if (!values.email) {
         newErrors.email = 'Email is required';
      }

      if (!values.phone) {
         newErrors.phone = 'Phone is required';
      }

      if (!values.password) {
         newErrors.password = 'Password is required';
      }

      if (values.password !== values.confirmPassword) {
         newErrors.confirmPassword = 'Passwords do not match';
      }

      if (Object.keys(newErrors).length > 0) {
         setErrors(newErrors);
         return;
      }

      axios.post('http://localhost:8081/register', values)
         .then(res => {
            if (res.data.Status === 'Success') {
               navigate('/login');
            } else {
               setError(res.data.Error);
            }
         })
         .catch(err => console.log(err));
   }

   return (
      <div className="centered-container">
         <div className="container">
            <h1 className="text-center">PlantexMate</h1>
            <div className="row justify-content-center">
               <div className="col-md-6">
                  <form onSubmit={handleSubmit}>
                     <div className="form-group">
                        <label htmlFor="inputUsername">Username</label>
                        <input
                           type="text"
                           className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                           id="inputUsername"
                           placeholder="Enter username"
                           onChange={e => setValues({ ...values, username: e.target.value })}
                        />
                        {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                     </div>
                     <br />
                     <div className="form-group">
                        <label htmlFor="inputEmail">Email address</label>
                        <input
                           type="email"
                           className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                           id="inputEmail"
                           aria-describedby="emailHelp"
                           placeholder="Enter email"
                           onChange={e => setValues({ ...values, email: e.target.value })}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                     </div>
                     <br />
                     <div className="form-group">
                        <label htmlFor="inputPhone">Phone</label>
                        <input
                           type="text"
                           className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                           id="inputPhone"
                           placeholder="Enter phone"
                           onChange={e => setValues({ ...values, phone: e.target.value })}
                        />
                        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                     </div>
                     <br />
                     <div className="form-group">
                        <label htmlFor="inputPassword">Password</label>
                        <input
                           type="password"
                           className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                           id="inputPassword"
                           placeholder="Password"
                           onChange={e => setValues({ ...values, password: e.target.value })}
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                     </div>
                     <br />
                     <div className="form-group">
                        <label htmlFor="inputConfirmPassword">Confirm Password</label>
                        <input
                           type="password"
                           className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                           id="inputConfirmPassword"
                           placeholder="Confirm Password"
                           onChange={e => setValues({ ...values, confirmPassword: e.target.value })}
                        />
                        {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                     </div>
                     <br />
                     <div className="form-group form-check">
                     </div>
                     <button type="submit" className="btn btn-primary">Register</button>
                  </form>
                  <p>Already have an account? <a href="/login">Login</a></p>
                  {error && <div className="text-danger">{error}</div>}
               </div>
            </div>
         </div>
      </div>
   );
}

export default Registration;
