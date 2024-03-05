import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';

function Admindashboard() {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:8081/dashboard')
            .then(res => {
                if (res.data.Status === "Success") {

                } else {
                    navigate('/login');
                }
            });
    }, []);

    const handleLogout = () => {
        axios.get('http://localhost:8081/logout')
            .then(res => {

            })
            .catch(err => console.log(err));
    }

    return (
        <div className="container-fluid app-container">
   <div className="row flex-nowrap">
      <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
         <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link to="/" className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
            <span className="fs-5 fw-bolder d-none d-sm-inline">Admin Dashboard</span>
            </Link>
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
               <li>
                  <Link to="./" data-bs-toggle="collapse" className="nav-link text-white px-0 align-middle">
                  <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Home</span> </Link>
               </li>
               <li>
                  <Link to="addline" className="nav-link px-0 align-middle text-white">
                  <i class="fas fa-disease"></i><span className="ms-1 d-none d-sm-inline">Diseas prediction</span>
                  </Link>
               </li>
               <li>
                  <Link to="all_lines" className="nav-link px-0 align-middle text-white">
                  <i class="fas fa-history"></i><span className="ms-1 d-none d-sm-inline">History</span>
                  </Link>
               </li>
               <li onClick={handleLogout}>
                  <a href="" className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-power"></i> <span className="ms-1 d-none d-sm-inline">Logout</span></a>
               </li>
            </ul>
         </div>
      </div>
      <div className="col p-0 m-0">
         <Outlet />
      </div>
   </div>
</div>
    );
}

export default Admindashboard;
