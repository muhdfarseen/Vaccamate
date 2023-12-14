import Features from './Features';
import Footer from './Footer';
import './Homepage.css';
import Navbar from './Navbar';
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

export default function Homepage() {
  return (
    <div>
        
        <Navbar/>
      
      
        <div className="Hometop">
            <img src="images\homesupergirl.png" height="185px" alt=""/>

            <h5 className="pichead">Simplify Your Child's <br/>
                Immunization Schedule</h5>
        </div>

        <div className="Section2">
            <div className="leftpart">
                <h3 className="Effortlessly">
                    Effortlessly Manage Your <br/>
                    Child's Vaccinations
                </h3>
                <p className="Organize">
                    Organize Your Child's Immunization <br/>
                    Records with VaccAmate
                </p>
                <div className="loginbuttons">
                
                    <NavLink  to='/signin' className="btn btn-primary loginbtn" >Sign In</NavLink>
                    <NavLink  to='/signup' className="btn btn-outline-primary loginbtn" >Sign Up</NavLink>
            
                </div>
            </div>

            <div>
                <img className="botompic" src="images\vacc.png"  alt=""/>
            </div>
        </div>

        <Features/>
      <Footer/>

    </div>
  )
}
