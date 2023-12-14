import React from 'react'
import AdminChild from './AdminChild'
import { BrowserRouter as Router, Routes, Route, NavLink, useParams, useLocation } from "react-router-dom";
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom'

import { supabase } from '../supabase/config';




function Profilehp() {


  const { searchValue } = useParams();
  const navigate = useNavigate();

  console.log(searchValue)

  // ----------------FETCHING DATA------------

  const [user,setuser]= useState([])
  
  useEffect(() => {

    fetchUser()

  }, [])

  console.log()
  

  async function fetchUser(){
    const {data} = await supabase

    .from('Parent')
      .select('Name, Aadhar, Address, Phone_no, Password,No_of_children')
      .eq('Aadhar', searchValue)
      .limit(1);

    setuser(data)

    console.log(data)
  }

  const handleSearch = async (e) => {
      e.preventDefault();
      navigate(`/createchild/${searchValue}`);
  }

  const handleSearchtwo = async (e) => {
    e.preventDefault();
    navigate(`/admineditprofile/${searchValue}`);
}

console.log(searchValue)

  return (

    <div> 
 
        
     
      <nav id="home" className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand" >
                <img src="/images/wordmark.png" width="120px" alt="VaccAmate" className="d-inline-block align-text-top" />
              </a>
              
            <div className="collapse navbar-collapse " id="navbarTogglerDemo03">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0"> </ul>

                
                <NavLink  to='/usersearch' className="nav-link"><b >Go back</b></NavLink>

                <NavLink  to='/adminlogin' className="btn btnn btn-outline-danger btn-sm">Log Out</NavLink>
                
               

            </div>
        </div>
      </nav>



      {user.map((userItem) => (
      <div key={userItem.Aadhar} className="container pt-5 px-5 ">
        <div className="card">
          <div className="card-header">
            Adhar Number: {userItem.Aadhar}
          </div>
          <div className="card-body">
            <img src="/images/profileicon.png" width="85" alt="" />
            <h5 className="card-title">{userItem.Name}</h5>
            <p className="card-text">
              <b>Address :</b> {userItem.Address} <br /> 
              <b>Phone No :</b> {userItem.Phone_no}
            </p>

            

            <button onClick={handleSearch} className="btn btn-primary btn-sm me-2 mt-2"> <b>+</b> Create New Child Profile </button>

            <button onClick={handleSearchtwo} className="btn btn-secondary btn-sm opacity-75 mt-2">
                <img className="me-2 " src="/images/edit.svg" width="16px" alt="" />
                Edit Profile
             </button>

           
          </div>
        </div>

       
        
        
          <AdminChild key={null} Aadhar={userItem.Aadhar} searchValue={searchValue} />
         
        

      </div>
      
      ))}
        
      <br /><br />

    </div>
  )
}

export default Profilehp