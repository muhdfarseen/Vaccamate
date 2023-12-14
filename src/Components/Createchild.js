import React from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from 'react';
import { supabase } from '../supabase/config';

function Createchild() {

   
    

 //--------------------------------------------------//

    const navigate = useNavigate();

    const { searchValue } = useParams();

    const handleSearch = async (e) => {
        e.preventDefault();
        navigate(`/profilehp/${searchValue}`);
    }

 //--------------------------------------------------//
 //                  DB INSERT
 //--------------------------------------------------


 const [childName, setChildName] = useState('');
 const [dob, setDOB] = useState('');
 const [bid, setBID] = useState('');
 const [gender, setGender] = useState('');
 
 const handleSubmit = async (e) => {
  e.preventDefault();

  const bidValue = bid ? parseInt(bid) : null;

  // Check if the bidValue is a valid integer
  if (isNaN(bidValue)) {
    console.error('Invalid BID value');
    return;
  }

  // Check if the BID already exists in the database
  const { data: existingData, error: existingError } = await supabase
    .from('Child_table')
    .select()
    .eq('BID', bidValue);

  if (existingData && existingData.length > 0) {
    // BID already exists in the database
    alert('BID already exists');
    return;
  }

  if (existingError) {
    console.error(existingError);
    return;
  }

  // Create a new row in the Child_table
  const { data, error } = await supabase.from('Child_table').insert([
    { P_adhar: searchValue, Child_name: childName, DOB: dob, BID: bid, Gender: gender },
  ]);

  if (error) {
    console.error(error);
    return;
  }

  // Reset the form input values
  setChildName('');
  setDOB('');
  setBID('');
  setGender('');

  // Create 24 new rows in the Vaccine_table for the child
  for (let i = 1; i <= 24; i++) {
    const { data: vaccineData, error: vaccineError } = await supabase.from('Vaccine_table').insert([
      { BID: bid, Vacc_num: i, Due_on: null, Given_on: null, Given_from: null },
    ]);

    if (vaccineError) {
      console.error(vaccineError);
      return;
    }
  }

  alert('Profile Added Successfully');
  navigate(`/profilehp/${searchValue}`);

  // Display success message or perform any other actions
};

  
  





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

                
               
                <button onClick={handleSearch} className="nav-link"> <b >Go back</b> </button>

                <NavLink  to='/adminlogin' className="btn btnn btn-outline-danger btn-sm">Log Out</NavLink>
                
               

            </div>
        </div>
      </nav>

    <div className='middle'>
        <div className='left' style={{background: '#FFF7F3'}}>
            <img src="/images/baby.png" width="229px" alt="" />
            <div>
                <h2 className='head' style={{color: '#AF6B52'}}>
                Empower your children's <br /> health: vaccinate them <br /> and keep them safe!
                </h2>
                <p className='para' style={{color: '#AF6B52'}}>
                It's important for children to be <br /> vaccinated so that they have the <br /> opportunity to become adults.                </p>
            </div>           
        </div>

        <div className='right'>
            
            <form onSubmit={handleSubmit}  className="row g-3 container m-0 p-4 pt-0">

                <h3>Create New Child Profile</h3>
                
                <div className="col-12">
                    <label htmlFor="Name" className="form-label">Name</label>
                    <input type="text"
                    className="form-control"
                    id="pName"
                    name='Childname'
                    onChange={(e) => setChildName(e.target.value)}
                    placeholder="Name"
                    required/>
                </div>

                <div className="col-md-6">
                    <label htmlFor="BID" className="form-label">Birth Certificate ID</label>
                    <input type="Number"
                    className="form-control"
                    onChange={(e) => setBID(e.target.value)}
                    name='BID'
                    id="BID"
                    required/>
                </div>

                <div className="col-md-6">
                    <label htmlFor="Phone Number" className="form-label">Date of Birth</label>
                    <input
                    type="date"
                    name='DOB'
                    onChange={(e) => setDOB(e.target.value)}
                    className="form-control"
                    id="PhoneNumber"
                    required/>
                </div>

                <div className="col-12" >
                    <label htmlFor="inputAddress2" className="form-label">Gender</label>
                    <div className="form-check">
                        <input onChange={(e) => setGender(e.target.value)} className="form-check-input" value='Male' type="radio" name="Gender" id="Gender1"/>
                        <label className="form-check-label" htmlFor="Gender">Male</label>
                    </div>
                    <div className="form-check">
                    <input onChange={(e) => setGender(e.target.value)} className="form-check-input" value='Female' type="radio" name="Gender" id="Gender1"/>
                        <label className="form-check-label" htmlFor="Gender">Female</label>
                    </div>
                </div>

                <div className="col-12 ">
                    <button type='reset'   className="btn btn-outline-danger px-3 " >Cancel</button>
                    <button type='submit'  className="btn btn-primary mx-2 px-4" >Create</button>
                   
                </div>

            </form>

        </div>
    </div>
    </div>
  )
}

export default Createchild