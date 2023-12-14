import { useEffect,useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

import { supabase } from '../supabase/config';

function Child({Aadhar},{token}) {

//   ---------------------databasee fetch --------------------

const [child,setchild]= useState([])
  
  useEffect(() => {

    fetchchild()

  }, [])

  console.log()
  

  async function fetchchild(){
    const {data} = await supabase

    .from('Child_table')
      .select('BID, Child_name, DOB, Gender')
      .eq('P_adhar', Aadhar)
      

    setchild(data)

    console.log(data)
  }

//   ---------------------------db dbd bdb-----------------------------

  return (
    <div>

        {child.map((userItem) => (
        <div className="container pt-5 pb-0 ">
            <div className="card text-dark bg-light">
                <div className="card-body">
                    <h5 className="card-title">  {userItem.Child_name} </h5>
                    <p className="card-text">
                        
                        <b> Date of Birth : </b> {userItem.DOB} <br/>
                        <b> Gender : </b> {userItem.Gender} <br />
                        <b> Birth Certificate ID : </b>{userItem.BID}

                    </p>
                    
                    <NavLink  to={`/Vaccrec/${userItem.BID}`} className=" btn btn-primary mb-2 "  style={{marginRight:"10px"}} >
                      <img className="me-1 " src="/images/eye.svg" width="15px" alt="" /> View Vaccine Record
                    </NavLink>
                   
                    
                </div>
            </div>
        </div>
        
        ))}

    </div>
  )
}

export default Child