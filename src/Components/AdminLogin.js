import React from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink , useNavigate} from "react-router-dom";

import { useEffect,useState } from 'react';
import { supabase } from '../supabase/config';



function AdminLogin() {



    let navigate = useNavigate()

    const [regdata,setregdata]=useState({
       
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

async function handleSubmit(e){

    e.preventDefault()

    try{
        const { data, error } = await supabase.auth.signInWithPassword({
            email: regdata.email,
            password: regdata.password,
          })


        if(error) throw error
        console.log(data)
      
        
        navigate('/usersearch')

    }
    catch(error){
        alert(error)
    }

}



  return (
    <div>
        <nav id="home" className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <NavLink  to='/' className="navbar-brand" ><img src="images/wordmark.png" width="120px" alt="VaccAmate" className="d-inline-block align-text-top" /></NavLink>

              
            <div className="collapse navbar-collapse " id="navbarTogglerDemo03">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                
                </ul>
                
            </div>
        </div>
        </nav>

    <div className='middle'>
        <div className='left'>
            <img src="images/adminlogin.png" width="229px" alt="" />
            <div>
                <h2 className='head' style={{color: '#618FF4'}}>
                Ensure Proper<br />  Administration.
                
                </h2>
                <p className='para' style={{color: '#618FF4'}}>
                Ensure that all vaccines are approved <br />and administered by a qualified professionals.
                
                </p>
            </div>    
        </div>

        <div className='right'>
            
            <form className="row g-3 container m-0 p-4 pt-0" onSubmit={handleSubmit}>
                <h3>Sign in to Vaccamate</h3>

                <div className="col-md-7">
                    <label htmlFor="Ahaar Number" className="form-label">Hospital Email Address</label>
                    <input type="email" onChange={handleChange} className="form-control" id="Aadhar" name='email' required/>
                </div>

                <div className="col-md-7">
                    <label htmlFor="inputPassword4" className="form-label">Password</label>
                    <input type="password" onChange={handleChange} className="form-control" id="inputPassword4" name='password' required/>
                </div>

                <div className="col-12 d-grid gap-2 d-md-block">
                    {/* <NavLink  to='/usersearch' className="btn btn-primary px-4" >Sign In</NavLink> */}
                    <button className="btn btn-primary px-4">Sign In</button>
                </div>
            </form>

        </div>
    </div>
    </div>
  )
}

export default AdminLogin