import React from 'react'

function Vacctable() {
  return (
    
    <div>
        <div id="my-component" className="container p-5">

        <h3 className="text-center">Immunization Record</h3> <br />

        <div className="card text-dark bg-light mb-3">
            <div className="card-body">
                <h5 className="card-title"> <b> Zain Lubin</b></h5>
                <p className="card-text"><b>Age :</b> 12 <br/> 
                <b>Parent : </b> Random Name <br/>
                <b>Address :</b> Kannur... </p>
            </div>
        </div>
    
        <table  className="table mb-5 table-hover table-bordered">
        <thead>
            <tr className="table-light">
            <th scope="col">Age</th>
            <th scope="col">Vaccine</th>
            <th scope="col">Due on</th>
            <th scope="col">Given on</th>
            <th scope="col">Given from</th>
            
            </tr>
        </thead>

        <tbody>
            <tr>
                <th scope="row" rowSpan="3">Birth 14 days</th>
                <td>BCG</td>
                <td></td>
                <td>11 Mar 2001</td>
                <td>Kannur Hospital</td>
            </tr>
            
            <tr>
                <td>BCG</td>
                <td></td>
                <td>11 Mar 2001</td>
                <td>Kannur Hospital</td>
                
            </tr>
            <tr>
                <td>BCG</td>
                <td></td>
                <td>11 Mar 2001</td>
                <td>Kannur Hospital</td>
                
            </tr>

            {/* 2ND */}
            

            <tr>
                <th scope="row" rowSpan="4">Birth 14 days</th>
                <td>BCG</td>
                <td></td>
                <td>11 Mar 2001</td>
                <td>Kannur Hospital</td>
                
            </tr>
            <tr>
                <td>BCG</td>
                <td></td>
                <td>11 Mar 2001</td>
                <td>Kannur Hospital</td>
                
            </tr>
            <tr>
                <td>BCG</td>
                <td></td>
                <td>11 Mar 2001</td>
                <td>Kannur Hospital</td>
                
            </tr>
            <tr>
                <td>BCG</td>
                <td></td>
                <td>11 Mar 2001</td>
                <td>Kannur Hospital</td>
                
            </tr>

            {/* 3RD */}

            <tr>
                <th scope="row" rowSpan="3">Birth 14 days</th>
                <td>BCG</td>
                <td></td>
                <td>11 Mar 2001</td>
                <td>Kannur Hospital</td>
                
            </tr>
            <tr>
                <td>BCG</td>
                <td></td>
                <td>11 Mar 2001</td>
                <td>Kannur Hospital</td>
                
            </tr>
            <tr>
                <td>BCG</td>
                <td></td>
                <td>11 Mar 2001</td>
                <td>Kannur Hospital</td>
                
            </tr>

            {/* 4TH */}

            <tr>
                <th scope="row" rowSpan="4">Birth 14 days</th>
                <td>BCG</td>
                <td></td>
                <td>11 Mar 2001</td>
                <td>Kannur Hospital</td>
                
            </tr>
            <tr>
                <td>BCG</td>
                <td></td>
                <td>11 Mar 2001</td>
                <td>Kannur Hospital</td>
                
            </tr>
            <tr>
                <td>BCG</td>
                <td></td>
                <td>11 Mar 2001</td>
                <td>Kannur Hospital</td>
                
            </tr>
            <tr>
                <td>BCG</td>
                <td></td>
                <td>11 Mar 2001</td>
                <td>Kannur Hospital</td>
                
            </tr>

            {/* 5TH */}

            <tr>
                <th scope="row">Birth 14 days</th>
                <td>BCG</td>
                <td></td>
                <td>11 Mar 2001</td>
                <td>Kannur Hospital</td>
                
            </tr>

            {/* 6TH */}

            <tr>
                <th scope="row">Birth 14 days</th>
                <td>BCG</td>
                <td></td>
                <td>11 Mar 2001</td>
                <td>Kannur Hospital</td>
                
            </tr>
            
            {/* 7TH */}

            <tr>
                <th scope="row" rowSpan="2">Birth 14 days</th>
                <td>BCG</td>
                <td></td>
                <td>11 Mar 2001</td>
                <td>Kannur Hospital</td>
                

            </tr>
            <tr>
                <td>BCG</td>
                <td></td>
                <td>11 Mar 2001</td>
                <td>Kannur Hospital</td>
                
            </tr>

            {/*  */}

            <tr>
                <th scope="row">Birth 14 days</th>
                <td>BCG</td>
                <td></td>
                <td>11 Mar 2001</td>
                <td>Kannur Hospital</td>
                
            </tr>

            <tr>
                <th scope="row">Birth 14 days</th>
                <td>BCG</td>
                <td></td>
                <td>11 Mar 2001</td>
                <td>Kannur Hospital</td>
                
            </tr>

            <tr>
                <th scope="row">Birth 14 days</th>
                <td>BCG</td>
                <td></td>
                <td>11 Mar 2001</td>
                <td>Kannur Hospital</td>
                
            </tr>

            <tr>
                <th scope="row">Birth 14 days</th>
                <td>BCG</td>
                <td></td>
                <td>11 Mar 2001</td>
                <td>Kannur Hospital</td>
                
            </tr>

            {/* ADDITIONAL VACC */}

            <tr>
                <th className="text-center table-light" scope="row" colSpan="6" align="center">Additional Vaccines</th>
            </tr> 

            <tr>
                <th scope="row">Birth 14 days</th>
                <td>BCG</td>
                <td></td>
                <td>11 Mar 2001</td>
                <td>Kannur Hospital</td>
                
            </tr>

            <tr>
                <th scope="row">Birth 14 days</th>
                <td>BCG</td>
                <td></td>
                <td>11 Mar 2001</td>
                <td>Kannur Hospital</td>
                
            </tr>

        </tbody>
        </table>

        <div className="text-center mb-5">
            <img  src="images/wordmark.png" width="200px" alt="" />
        </div>

        </div>
    </div>
  )
}

export default Vacctable