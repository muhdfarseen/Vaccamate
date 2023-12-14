import './Navbar.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";


function Navbar() {
    return (
      <>
        <nav id="home" className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            
            <span className="navbar-toggler-icon"></span>
            </button>

            <NavLink  to='/' className="navbar-brand" ><img src="images/wordmark.png" width="120px" alt="VaccAmate" className="d-inline-block align-text-top" /></NavLink>
            
              
            <div className="collapse navbar-collapse " id="navbarTogglerDemo03">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                    <li className="nav-item">                    
                      <a className="nav-link" href="#Features">Features</a>
                    </li>

                    <li className="nav-item">                          
                      <a className="nav-link" href="#contact">Contact Us</a>
                    </li>
                </ul>
                
                {/* <NavLink  to='/adminlogin' className="btn btnn btn-primary btn-sm" >Admin Portal</NavLink> */}
            </div>
        </div>
        </nav>
      
      </>
  
    );
  }
  
export default Navbar;