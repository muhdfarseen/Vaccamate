import React from 'react'
import Child from './Child'
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom'

import { supabase } from '../supabase/config';


function Parent({token}) {

  let navigate = useNavigate()
  
  function handleLogout(){
    sessionStorage.removeItem('token')
    navigate('/')
  }

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
      .eq('Aadhar', token.user.user_metadata.adhar)
      .limit(1);

    setuser(data)

    console.log(data)
  }

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
                <ul className="navbar-nav me-auto mb-2 mb-lg-0"> </ul>

                
                <NavLink  to='/profile' className="nav-link"><b>{token.user.user_metadata.username}</b></NavLink>
                
                <button onClick={handleLogout} className="btn btnn btn-outline-danger btn-sm" >Log Out</button>

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
            <img src="images/profileicon.png" width="85" alt="" />
            <h5 className="card-title">{userItem.Name}</h5>
            <p className="card-text">
              <b>Address :</b> {userItem.Address} <br /> 
              <b>Phone No :</b> {userItem.Phone_no}
            </p>
            <NavLink to='/editprofile' className="btn btn-secondary btn-sm opacity-75">
              <img className="me-2 " src="images/edit.svg" width="16px" alt="" />Edit Profile
            </NavLink>
          </div>
        </div>

       
        
        
          <Child key={null} Aadhar={userItem.Aadhar} />
        

      </div>
      
      ))}
        
      <br /><br />

    </div>
  )
}

export default Parent