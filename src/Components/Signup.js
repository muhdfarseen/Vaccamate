import React, { useState,useContext } from 'react'

import './Navbar.css';
import './Signup.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { supabase } from '../supabase/config';
import Parent from './Parent';




function Signin() {

    const [regdata,setregdata]=useState({
        username:'',
        adhar:'',
        pnum:'',
        address:'',
        email:'',
        password:''

    })

    console.log(regdata)

 

function handleChange(event){

    setregdata((predata)=>{
        return{
            ...predata,
            [event.target.name]:event.target.value
            
        }
    })
}

async function handleSubmit(e) {
    e.preventDefault();
  
    try {
      const { user, error } = await supabase.auth.signUp({
        email: regdata.email,
        password: regdata.password,
        options: {
          data: {
              username: regdata.username,
              adhar: regdata.adhar,
              pnum: regdata.pnum,
              address:regdata.address
          }
      }
        
      });
  
      if (error) {
        // Handle specific error when a duplicate email is used
        if (error.message.includes('duplicate key value violates unique constraint')) {
          alert('This email is already registered. Please use a different email.');
          return;
        } else {
          throw error;
        }
      }
  
      // Registration successful
      console.log('Registration successful:', user);
  
      // Check if the email, adhar, and phoneno already exist in the table
      const { data: existingUser, error: fetchError } = await supabase
        .from('Parent')
        .select()
        .or(`Email.eq.${regdata.email}, Aadhar.eq.${regdata.adhar}, Phone_no.eq.${regdata.pnum}`);
  
      if (fetchError) throw fetchError;
  
      if (existingUser.length > 0) {
        const duplicateFields = existingUser[0];
  
        let duplicateFieldsStr = '';
        if (duplicateFields.Email === regdata.email) {
          duplicateFieldsStr += 'Email';
        }
        if (duplicateFields.Aadhar === regdata.adhar) {
          duplicateFieldsStr += (duplicateFieldsStr ? ', ' : '') + 'Aadhar';
        }
        if (duplicateFields.Phone_no === regdata.pnum) {
          duplicateFieldsStr += (duplicateFieldsStr ? ', ' : '') + 'Phone Number';
        }
  
        alert(`The following field(s) already exist: ${duplicateFieldsStr}. Please provide a different value(s).
        or the user is already registered. Sign in to access the profile`);
        return;
      }
  
      // Insert additional data into a separate table
      const { data, error: insertError } = await supabase
        .from('Parent')
        .insert([
          {
            Email: regdata.email,
            Password: regdata.password,
            Name: regdata.username,
            Aadhar: regdata.adhar,
            Phone_no: regdata.pnum,
            Address: regdata.address,
          },
        ]);
  
      if (insertError) throw insertError;
  
      // Additional data insertion successful
      console.log('Additional data inserted:', data);
  
      alert('Check your email for a verification link');
    } catch (error) {
      alert(error.message);
    }
  }
  

  return (
    
    <div >
        
    <nav id="home" className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <NavLink  to='/' className="navbar-brand" ><img src="images/wordmark.png" width="120px" alt="VaccAmate" className="d-inline-block align-text-top" /></NavLink>

              
            <div className="collapse navbar-collapse " id="navbarTogglerDemo03">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                
                </ul>
                Already Registered?   
                
                <NavLink  to='/signin' className="btn btnn btn-primary" >Sign In</NavLink>
            </div>
        </div>
    </nav>

    <div className='middle'>

        <div className='left'>
            <img src="images/signuppic.png" width="229px" alt="" />
            <div>
                <h2 className='head'>
                Take control of your child’s <br /> health: sign up now!
                </h2>
                <p className='para'>
                Stay one step ahead of disease: sign up <br /> now to easily access all your vaccination <br /> information right here!
                </p>
            </div>
              
            
              
        </div>

        <div className='right'>

            {/* form ----------------------------------------------------------------------*/}
            
        <form method='POST' onSubmit={handleSubmit}  className="row g-3 container m-0 p-4 pt-0">

            <h3>Sign up to Vaccamate</h3>
       
            <div className="col-12">
                <label htmlFor="Name" className="form-label">Name</label>
                <input
                type="text"
                className="form-control"
                onChange={handleChange}
                name="username"
                placeholder="Name"
                required/>
            </div>

            <div className="col-md-6">
                <label htmlFor="Ahaar Number" className="form-label">Aadhar Number</label>
                <input
                type="tel"
                className="form-control"
                pattern="\d{12}"
                onChange={handleChange}
                name="adhar"
                required/>
            </div>

            <div className="col-md-6">
                <label htmlFor="Phone Number" className="form-label">Phone Number</label>
                <input
                type="tel"
                pattern="\d{10}"
                className="form-control" 
                onChange={handleChange}
                name="pnum"
                required/>
            </div>

            <div className="col-12">
                <label htmlFor="inputAddress2" className="form-label">Address</label>
                <input
                type="text"
                className="form-control" 
                onChange={handleChange}
                name="address"
                required/>
            </div>

            <div className="col-md-6">
                <label htmlFor="emailid" className="form-label">E mail</label>
                <input
                type="email"
                className="form-control" 
                id="email"
                onChange={handleChange}
                name="email"
                required/>
            </div>

            <div className="col-md-6">
                <label htmlFor="inputPassword" className="form-label">Create Password</label>
                <input
                type="password"
                className="form-control" 
                onChange={handleChange}
                name="password"
                required/>
            </div>

            <div className="col-12 d-grid gap-2 d-md-block">

                <button className="btn btn-primary">Create Account</button>

                {/* <NavLink  to='/profile' className="btn btn-primary" >Create Account</NavLink> */}

            </div>
            </form>

        </div>
    </div>
    
    </div>
  )
}

export default Signin