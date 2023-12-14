import './Signin.css';
import { BrowserRouter as Router, Routes, Route, NavLink , useNavigate} from "react-router-dom";
import React from 'react'
import { useEffect,useState } from 'react';
import { supabase } from '../supabase/config';


const Signin = ({setToken}) => {

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
       
        setToken(data)
        navigate('/profile')

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
                Not a member?
                <NavLink  to='/signup' className="btn btnn btn-primary" >Sign Up</NavLink>
            </div>
        </div>
        </nav>

    <div className='middle'>
        <div className='left'>
            <img src="images/signinpic.png" width="229px" alt="" />
            <div>
                <h2 className='head'>
                Sign in and stay informed of <br /> your child’s vaccine schedule.
                
                </h2>
                <p className='para'>
                Invest in your child’s health: <br /> get vaccinated and protect your family.
                </p>
            </div>
              
            
              
        </div>

        <div className='right'>

         {/* ---------------------------------------form--------------------------------------------- */}

            <form method='POST' onSubmit={handleSubmit} className="row g-3 container m-0 p-4 pt-0">

            <h3>Sign in to Vaccamate</h3>

            <div className="col-md-7">
                <label htmlFor="E mail"
                className="form-label">E mail</label>
                
                <input type="email"
                name='email'
                onChange={handleChange}
                className="form-control"
                id="Aadhar"
                required/>
            </div>

            
            <div className="col-md-7">
                <label htmlFor="inputPassword4"className="form-label">Password</label>
                <input type="password" 
                name='password'
                className="form-control"
                onChange={handleChange}
                id="inputPassword4"
                required/>
            </div>

            

            <div className="col-12 d-grid gap-2 d-md-block">
                {/* <NavLink   className="btn btn-primary"  >Sign In</NavLink> */}
                <button className="btn btn-primary">Sign In</button>

            </div>
            </form>
        </div>
    </div>
    </div>
  )
}

export default Signin