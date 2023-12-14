import React, { useState } from 'react'
import './Navbar.css';
import './Signup.css';
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { supabase } from '../supabase/config';


function Editprofile({token}) {

    let navigate = useNavigate()

    const [regdata,setregdata]=useState({
        
        pnum:'',
        address:''
        
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
    function handlesubmit(e) {
        e.preventDefault();
      
        const updatedData = {};
      
        if (regdata.pnum !== '') {
          updatedData.Phone_no = regdata.pnum;
        }
      
        if (regdata.address !== '') {
          updatedData.Address = regdata.address;
        }
      
        if (Object.keys(updatedData).length === 0) {
          alert('No fields to update');
          return;
        }
      
        supabase
          .from('Parent')
          .update(updatedData)
          .eq('Aadhar', token.user.user_metadata.adhar)
          .then(response => {
            if (response.error) {
              console.error(response.error);
            } else {
              alert('Data updated successfully!');
              console.log('Data updated successfully!');
              navigate('/profile');
            }
          })
          .catch(error => {
            console.error(error);
          });
      }
      



  return (
    <div >
        
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

                
                <NavLink  to='/profile' className="nav-link"><b >{token.user.user_metadata.username}</b></NavLink>
                <NavLink  to='/' className="btn btnn btn-primary" >Log Out</NavLink>

            </div>
        </div>
      </nav>

    <div className='middle'>
        <div className='left'>
            <img src="images/editprofile.png" width="229px" alt="" />
            <div>
                <h2 className='head' style={{color: '#618FF4'}}>
                Secure their future: <br /> vaccinate your children!
                </h2>
                <p className='para' style={{color: '#618FF4'}}>
                We have to take care of the cure that <br /> will make the problem worse no matter what.
                </p>
            </div>           
        </div>

        <div className='right'>
            
            <form onSubmit={handlesubmit} className="row g-3 container m-0 p-4 pt-0">

            <h3>Edit Profile</h3>
           

            <div className="col-md-6">
                <label htmlFor="Phone Number" className="form-label">Phone Number</label>
                <input
                type="tel"
                pattern="\d{10}"
                className="form-control"
                id="PhoneNumber"
                onChange={handleChange}
                name="pnum"
                />
            </div>

            <div className="col-12">
                <label htmlFor="inputAddress2" className="form-label">Address</label>
                <input
                type="text"
                className="form-control"
                onChange={handleChange}
                name="address"
                id="inputAddress2"
                />
            </div>

            

            <div className="col-12  ">

                <button type='reset'  className="btn btn-outline-danger " >Cancel</button>
                
                <button className="btn btn-primary mx-2 px-4 ">Save</button>

            </div>

            </form>

        </div>
    </div>
    
    </div>
  )
}

export default Editprofile