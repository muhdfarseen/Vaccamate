import React from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { useEffect,useState } from 'react';
import { supabase } from '../supabase/config';


function Usersearch() {

    

   
        const navigate = useNavigate();
        const [searchValue, setSearchValue] = useState('');
      
        const handleSearch = async (e) => {
            e.preventDefault();
          // Check if the entered data is available in the database
          const { data, error } = await supabase
            .from('Parent')
            .select('*')
            .eq('Aadhar', searchValue);
      
          if (error) {
            console.error(error);
            return;
          }
      
          if (data.length > 0) {
            // Data found, navigate to the results page and pass the value
            navigate(`/Profilehp/${searchValue}`);
          } else {
            // Data not found, show an alert
            alert('User not found');
          }
        };



  return (
    <div>
        <nav id="home" className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" >
            <img src="images/wordmark.png" width="120px" alt="VaccAmate" className="d-inline-block align-text-top" />
          </a>
          
        <div className="collapse navbar-collapse " id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                
                <li className="nav-item">                    
                   
                    {/* <NavLink  to='/' className="nav-link" >Home</NavLink> */}
                </li>
            
            </ul>
            <NavLink  to='/adminlogin' className="btn btnn btn-outline-danger btn-sm" >Log Out</NavLink>
            
        </div>
    </div>
        </nav>

<div className='middle'>
   
    <div className='left'>
        <img src="images/users.png" width="229px" alt="" />
        <div>
            <h2 className='head' style={{color: '#618FF4'}}>
            Vaccamate Demo Hospital <br/>
            epsilon Mini Project
            
            </h2>
            <p className='para' style={{color: '#618FF4'}}>
            College of Engineering Thalassery<br />
            Kannur, Kerala, 
            India
            
            </p>
        </div>    
    </div>

    <div className='right'>
        
        <form className="row g-3 container m-0 p-4 pt-0" name='form'>

            <h3>Search Parent</h3>

            <div className="col-md-7">
                <label htmlFor="Ahaar Number" className="form-label" >Aadhaar Number</label>
                <input
                type="number"
                className="form-control" 
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                
                id="Aadhar" required/>

                <button onClick={handleSearch}  className="btn btn-primary px-4 my-3" >Search</button>
            </div>

        </form>

    </div>
</div>
</div>
  )
}

export default Usersearch