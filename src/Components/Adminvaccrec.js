import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { supabase } from '../supabase/config';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import jsPDF from 'jspdf';

function Adminvaccrec() {

        //   PDF CODE JSPDF PDF CODE JSPDF PDF CODE JSPDF--------------------------------------

        const generatePDF = () => {
            const doc = new jsPDF();
    
    
            const imgData = "/images/Vaccinepdf.png";
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const imageWidth = pageWidth; // Set the image width to the page width
            const imageHeight = pageHeight; // Set the image height to the page height
            const imageX = 0; // X coordinate of the image (left-aligned)
            const imageY = 0; // Y coordinate of the image (top-aligned)
    
            doc.addImage(imgData, "PNG", imageX, imageY, imageWidth, imageHeight);
    
    
            const name = child[0].Child_name;
            const dob = child[0].DOB;
            const parentName = parent[0].Name;
            const address = parent[0].Address;
    
            
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.setFont("bold");
            doc.text(`Name`, 15, 37);
            doc.text(`Date of Birth`, 15, 45);
            doc.text(`Parent Name`, 15, 53);
            doc.text(`Address`, 15, 61);
    
            doc.setFont("normal");
            doc.setTextColor(58, 58, 58);
            doc.text(`:   ${name}`, 45, 37);
            doc.text(`:   ${dob}`, 45, 45);
            doc.text(`:   ${parentName}`, 45, 53);
            doc.text(`:   ${address}`, 45, 62);
    
            // Set up the table
           
            const tableData = [
    
                ['Age'          , 'Vaccine Name'                    , 'Due On'            , 'Given On'           , 'Given From'],
    
                ['Birth 14 days', 'BCG'                             , vacc[0]?.Due_on ||'',vacc[0]?.Given_on ||'', vacc[0]?.Given_from ||''],
                ['       '      , 'Oral Polio Vaccine 10 dose'      , vacc[1]?.Due_on ||'', vacc[1]?.Given_on ||'', vacc[1]?.Given_from ||''],
                ['       '      , 'Hepatitis B Vaccine - 1st dose'  , vacc[2]?.Due_on ||'', vacc[2]?.Given_on ||'', vacc[2]?.Given_from ||''],
    
                ['6 Week'       , 'DPT-1ST dose'                    , vacc[3]?.Due_on ||'', vacc[3]?.Given_on ||'', vacc[3]?.Given_from ||''],
                ['       '      , 'Oral Polio Vaccine - 1st dose'   , vacc[4]?.Due_on ||'', vacc[4]?.Given_on ||'', vacc[4]?.Given_from ||''],
                ['       '      , 'Hepatitis B Vaccine -2nd dose'   , vacc[5]?.Due_on ||'', vacc[5]?.Given_on ||'', vacc[5]?.Given_from ||''],
                ['       '      , 'Hib I'                           , vacc[6]?.Due_on ||'', vacc[6]?.Given_on ||'', vacc[6]?.Given_from ||''],
    
                ['10 Weeks'     , 'DPT - 2nd dose'                  , vacc[7]?.Due_on ||'', vacc[7]?.Given_on ||'', vacc[7]?.Given_from ||''],
                ['       '      , 'Oral Polio Vaccine - 2nd dose'   , vacc[8]?.Due_on ||'', vacc[8]?.Given_on ||'', vacc[8]?.Given_from ||''],
                ['       '      , 'Hib II'                          , vacc[9]?.Due_on ||'', vacc[9]?.Given_on ||'', vacc[9]?.Given_from ||''],
    
                ['14 weeks'     , 'DPT - 3rd dose'                  , vacc[10]?.Due_on ||'', vacc[10]?.Given_on ||'', vacc[10]?.Given_from ||''],
                ['       '      , 'Oral Polio Vaccine - 3RD dose'   , vacc[11]?.Due_on ||'', vacc[11]?.Given_on ||'', vacc[11]?.Given_from ||''],
                ['       '      , 'Hepatitise B Vaccine - 3rd dose' , vacc[12]?.Due_on ||'', vacc[12]?.Given_on ||'', vacc[12]?.Given_from ||''],
                ['       '      , 'HIB III'                         , vacc[13]?.Due_on ||'', vacc[13]?.Given_on ||'', vacc[13]?.Given_from ||''],
    
                ['9 Months'     , 'Measles Vaccine'                 , vacc[14]?.Due_on ||'', vacc[14]?.Given_on ||'', vacc[14]?.Given_from ||''],
                ['15 months'    , 'MMR(Measles mumps Rubella)'      , vacc[15]?.Due_on ||'', vacc[15]?.Given_on ||'', vacc[15]?.Given_from ||''],
                ['18 Months'    , 'DPT - Hib booster'               , vacc[16]?.Due_on ||'', vacc[16]?.Given_on ||'', vacc[16]?.Given_from ||''],
                ['         '    , 'Oral Polio Vaccine'              , vacc[17]?.Due_on ||'', vacc[17]?.Given_on ||'', vacc[17]?.Given_from ||''],
                ['2 Years'      , 'Typhoid'                         , vacc[18]?.Due_on ||'', vacc[18]?.Given_on ||'', vacc[18]?.Given_from ||''],
                ['5 Years'      , 'DT/DPT - Booster'                , vacc[19]?.Due_on ||'', vacc[19]?.Given_on ||'', vacc[19]?.Given_from ||''],
                ['10 Years'     , 'TT(Tetanus)- booster'            , vacc[20]?.Due_on ||'', vacc[20]?.Given_on ||'', vacc[20]?.Given_from ||''],
                ['16 Year'      , 'TT(Tetanus) - booster'           , vacc[21]?.Due_on ||'', vacc[21]?.Given_on ||'', vacc[21]?.Given_from ||''],
    
                ['1 Years'      , 'Varicella'                       , vacc[22]?.Due_on ||'', vacc[22]?.Given_on ||'', vacc[22]?.Given_from ||''],         
                ['2 years'      , 'Hepatitis A'                     , vacc[23]?.Due_on ||'', vacc[23]?.Given_on ||'', vacc[23]?.Given_from ||'']
                
            ];
    
            const tableTop = 71;
            const tableLeft = 15;
          
            const cellHeight = 8.1;
    
            const columnWidths = [25, 50, 25, 25, 35];
    
            // Draw the table headers
            doc.setFontSize(12);
            doc.setFont("bold");
            for (let i = 0; i < tableData[0].length; i++) {
              doc.text(tableData[0][i], tableLeft + columnWidths.slice(0, i).reduce((a, b) => a + b, 0), tableTop);
            }
            
            // Draw the table rows
            doc.setFontSize(10);
            doc.setFont("normal");
            for (let i = 1; i < tableData.length; i++) {
              const rowData = tableData[i];
              for (let j = 0; j < rowData.length; j++) {
                doc.text(rowData[j], tableLeft + columnWidths.slice(0, j).reduce((a, b) => a + b, 0), tableTop + i * cellHeight);
              }
            }
            
        
            doc.save('immunisation_record.pdf');
          };
          
    
    // ------------------------------pdf eend--------------------------------------------

    const navigate = useNavigate();

    
    const { bid,Adhar } = useParams();

    console.log(bid,Adhar);
   
    const handleSearch = async (e) => {
        e.preventDefault();
        navigate(`/profilehp/${bid}`);
    }


const [child, setChild] = useState([]);
const [parent, setParent] = useState([]);

useEffect(() => {
    fetchChild();
}, []);

async function fetchChild() {
    const { data } = await supabase
        .from('Child_table')
        .select('BID, P_adhar, Child_name, DOB, Gender')
        .eq('BID', Adhar);

    setChild(data);
    console.log(data);

    // Fetch parent data for each child
    if (data.length > 0) {
        const parentData = await Promise.all(
            data.map(async (childItem) => {
                const { data: parent } = await supabase
                    .from('Parent')
                    .select('Name, Aadhar, Address, Phone_no, Password, No_of_children')
                    .eq('Aadhar', childItem.P_adhar);

                return parent[0]; // Assuming there is only one parent per child
            })
        );

        setParent(parentData);
        console.log(parentData);
    }
}



//------------------ DB FETCH VACC TABLE -----------------

const [vacc, setVacc] = useState([]);

useEffect(() => {
    fetchVacc();
}, []);

async function fetchVacc() {
    const { data } = await supabase
        .from('Vaccine_table')
        .select('BID, Vacc_num, Due_on, Given_on, Given_from')
        .eq('BID', Adhar);

        const sortedData = data.sort((a, b) => parseInt(a.Vacc_num) - parseInt(b.Vacc_num));
        setVacc(sortedData);
        console.log(sortedData);
}


//-----------------------------DB UPDATING VACC TABLE-----------------------------

const initialState = {
    vaccine: null,
    dueDate: null,
    givenDate: null,
    hospital: null
  };
  
  const [formData, setFormData] = useState(initialState);

  const handleFormUpdateSubmit = async (e) => {
    e.preventDefault();
   
    // Update the Vaccine_table where BID=2
    const { data, error } = await supabase
      .from('Vaccine_table')
      .update({
        Due_on: formData.dueDate,
        Given_on: formData.givenDate,
        Given_from: formData.hospital
      })
      .eq('Vacc_num', formData.vaccine) 
      .eq('BID', Adhar)
    
  
    if (error) {
      console.error(error);
    } else {
      alert('Vaccine record updated successfully');
    }
  };

  console.log(vacc)

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

        {child.map((userItem,index) => (

        <React.Fragment key={index}>
        <div className="container p-5">
            <div className="card text-dark bg-light">
            <div className="card-body">
                    <h5 className="card-title">  {userItem.Child_name} </h5>
                    <p className="card-text">
                        
                    <b> Date of Birth : </b> {userItem.DOB} <br/>
                    <b> Gender : </b> {userItem.Gender} <br />
                    <b> Birth Certificate ID : </b>{userItem.BID}
                    </p>

                    <button onClick={generatePDF} className="btn btn-primary px-3 ">
                        <img className="me-1 " src="/images/download.svg" width="10px" alt="" />
                        Download Vaccine Record
                    </button>                           
                </div>
            </div>
        </div>
        </React.Fragment>

        ))}


    <div className="container p-3 ">

     <div className=" P-5">
       
    </div> 

    <form className=" mb-5" onSubmit={handleFormUpdateSubmit}>
        <div className=" input-group mb-3">
            <span className="input-group-text w-10" style={{ width: "130px" }}>Select Vaccine :</span>
            <select className="form-select" onChange={e => setFormData({ ...formData, vaccine: e.target.value })}>
                    <option disabled selected hidden>Choose option</option>
                    <option value="1">BCG</option>
                    <option value="2">Oral Polio Vaccine 10 dose</option>
                    <option value="3">Hepatitis B Vaccine - 1st dose</option>
                    <option value="4">DPT-1ST dose</option>
                    <option value="5">Oral Polio Vaccine - 1st dose</option>
                    <option value="6">Hepatitis B Vaccine -2nd dose</option>
                    <option value="7">Hib I</option>
                    <option value="8">DPT - 2nd dose</option>
                    <option value="9">Oral Polio Vaccine - 2nd dose</option>
                    <option value="10">Hib II</option>
                    <option value="11">DPT - 3rd dose</option>
                    <option value="12">Oral Polio Vaccine - 3RD dose</option>
                    <option value="13">Hepatitise B Vaccine - 3rd dose</option>
                    <option value="14">HIB III</option>
                    <option value="15">Measles Vaccine</option>
                    <option value="16">MMR(Measles mumps Rubella)</option>
                    <option value="17">DPT - Hib booster</option>
                    <option value="18">Oral Polio Vaccine</option>
                    <option value="19">Typhoid</option>
                    <option value="20">DT/DPT - Booster</option>
                    <option value="21">TT(Tetanus)- booster</option>
                    <option value="22">TT(Tetanus)- booster</option>
                    <option value="23">Varicella</option>
                    <option value="24">Hepatitis A</option>
            </select>
            <span className="input-group-text w-10">Due on :</span>
                <input type="date" onChange={e => setFormData({ ...formData, dueDate: e.target.value })} className="form-control "/>
            
            <span className="input-group-text">Given on :</span>
                <input type="date" onChange={e => setFormData({ ...formData, givenDate: e.target.value })} className="form-control "/>
        </div>

        <div className=" input-group mb-3"> 
            <span className="input-group-text"style={{ width: "130px" }}>Given from :</span>
            <input placeholder='Hospital/Health Cente' type="text" onChange={e => setFormData({ ...formData, hospital: e.target.value })} className="form-control "/>
            
            <button type="reset" className="btn btn-danger btn-block ms-2 me-2">Clear</button>
            <button type="submit" className="btn btn-success btn-block">Update Vaccine Record</button>
        </div>
    </form>


    <h3 className="text-center">Immunisation Record</h3><br/> 

    <div className="table-responsive">
        <table className="table  table-hover   table-bordered ">
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


        {vacc.length > 0 && (
        <>


            <tr>
                <th scope="row" rowSpan="3">Birth 14 days</th>
                <td>BCG</td>
                <td>{vacc[0]?.Due_on ||''}</td>
                <td>{vacc[0]?.Given_on ||''}</td>
                <td>{vacc[0]?.Given_from ||''}</td>
    
            </tr>
            
            <tr>
                <td>Oral Polio Vaccine 10 dose</td>
                <td>{vacc[1]?.Due_on ||''}</td>
                <td>{vacc[1]?.Given_on ||''}</td>
                <td>{vacc[1]?.Given_from ||''}</td>
                
            </tr>
            <tr>
                <td>Hepatitis B Vaccine - 1st dose</td>
                <td>{vacc[2]?.Due_on ||''}</td>
                <td>{vacc[2]?.Given_on ||''}</td>
                <td>{vacc[2]?.Given_from ||''}</td>
                
            </tr>

            {/* 2ND */}
            

            <tr>
                <th scope="row" rowSpan="4">6 Weeks</th>
                <td>DPT - 1st dose</td>
                <td>{vacc[3]?.Due_on ||''}</td>
                <td>{vacc[3]?.Given_on ||''}</td>
                <td>{vacc[3]?.Given_from ||''}</td>
                
            </tr>
            <tr>
                <td>Oral Polio Vaccine - 1st dose</td>
                <td>{vacc[4]?.Due_on ||''}</td>
                <td>{vacc[4]?.Given_on ||''}</td>
                <td>{vacc[4]?.Given_from ||''}</td>
                
            </tr>
            <tr>
                <td>Hepatitis B Vaccine - 2nd dose</td>
                <td>{vacc[5]?.Due_on ||''}</td>
                <td>{vacc[5]?.Given_on ||''}</td>
                <td>{vacc[5]?.Given_from ||''}</td>
                
            </tr>
            <tr>
                <td>Hib I</td>
                <td>{vacc[6]?.Due_on ||''}</td>
                <td>{vacc[6]?.Given_on ||''}</td>
                <td>{vacc[6]?.Given_from ||''}</td>
                
            </tr>

            {/* 3RD */}

            <tr>
                <th scope="row" rowSpan="3">10 weeks</th>
                <td>DPT - 2nd dose</td>
                <td>{vacc[7]?.Due_on ||''}</td>
                <td>{vacc[7]?.Given_on ||''}</td>
                <td>{vacc[7]?.Given_from ||''}</td>
                
            </tr>
            <tr>
                <td>Oral Polio Vaccine - 2nd dose</td>
                <td>{vacc[8]?.Due_on ||''}</td>
                <td>{vacc[8]?.Given_on ||''}</td>
                <td>{vacc[8]?.Given_from ||''}</td>
                
            </tr>
            <tr>
                <td>Hib II</td>
                <td>{vacc[9]?.Due_on ||''}</td>
                <td>{vacc[9]?.Given_on ||''}</td>
                <td>{vacc[9]?.Given_from ||''}</td>
                
            </tr>

            {/* 4TH */}

            <tr>
                <th scope="row" rowSpan="4">14 weeks</th>
                <td>DPT - 3rd dose</td>
                <td>{vacc[10]?.Due_on ||''}</td>
                <td>{vacc[10]?.Given_on ||''}</td>
                <td>{vacc[10]?.Given_from ||''}</td>
                
            </tr>
            <tr>
                <td>Oral Polio Vaccine - 3RD dose</td>
                <td>{vacc[11]?.Due_on ||''}</td>
                <td>{vacc[11]?.Given_on ||''}</td>
                <td>{vacc[11]?.Given_from ||''}</td>
                
            </tr>
            <tr>
                <td>Hepatitise B Vaccine - 3rd dose</td>
                <td>{vacc[12]?.Due_on ||''}</td>
                <td>{vacc[12]?.Given_on ||''}</td>
                <td>{vacc[12]?.Given_from ||''}</td>
                
            </tr>
            <tr>
                <td>HIB III</td>
                <td>{vacc[13]?.Due_on ||''}</td>
                <td>{vacc[13]?.Given_on ||''}</td>
                <td>{vacc[13]?.Given_from ||''}</td>
                
            </tr>

            {/* 5TH */}

            <tr>
                <th scope="row">9 Months</th>
                <td>Measles Vaccine</td>
                <td>{vacc[14]?.Due_on ||''}</td>
                <td>{vacc[14]?.Given_on ||''}</td>
                <td>{vacc[14]?.Given_from ||''}</td>
                
            </tr>

            {/* 6TH */}

            <tr>
                <th scope="row">15 months</th>
                <td>MMR(Measles mumps Rubella)</td>
                <td>{vacc[15]?.Due_on ||''}</td>
                <td>{vacc[15]?.Given_on ||''}</td>
                <td>{vacc[15]?.Given_from ||''}</td>
                
            </tr>
            
            {/* 7TH */}

            <tr>
                <th scope="row" rowSpan="2">18 Months</th>
                <td>DPT - Hib booster</td>
                <td>{vacc[16]?.Due_on ||''}</td>
                <td>{vacc[16]?.Given_on ||''}</td>
                <td>{vacc[16]?.Given_from ||''}</td>
                

            </tr>
            <tr>
                <td>Oral Polio Vaccine</td>
                <td>{vacc[17]?.Due_on ||''}</td>
                <td>{vacc[17]?.Given_on ||''}</td>
                <td>{vacc[17]?.Given_from ||''}</td>
                
            </tr>

            {/*  */}

            <tr>
                <th scope="row">2 Years</th>
                <td>Typhoid</td>
                <td>{vacc[18]?.Due_on ||''}</td>
                <td>{vacc[18]?.Given_on ||''}</td>
                <td>{vacc[18]?.Given_from ||''}</td>
                
            </tr>

            <tr>
                <th scope="row">5 Years</th>
                <td>DT/DPT - Booster</td>
                <td>{vacc[19]?.Due_on ||''}</td>
                <td>{vacc[19]?.Given_on ||''}</td>
                <td>{vacc[19]?.Given_from ||''}</td>
                
            </tr>

            <tr>
                <th scope="row">10 Years</th>
                <td>TT(Tetanus)- booster</td>
                <td>{vacc[20]?.Due_on ||''}</td>
                <td>{vacc[20]?.Given_on ||''}</td>
                <td>{vacc[20]?.Given_from ||''}</td>
                
            </tr>

            <tr>
                <th scope="row">16 Years</th>
                <td>TT(Tetanus)- booster</td>
                <td>{vacc[21]?.Due_on ||''}</td>
                <td>{vacc[21]?.Given_on ||''}</td>
                <td>{vacc[21]?.Given_from ||''}</td>
                
            </tr>

            {/* ADDITIONAL VACC */}

            <tr>
                <th className="text-center table-light" scope="row" colSpan="6" align="center">Additional Vaccines</th>
            </tr> 

            <tr>
                <th scope="row">1 Year</th>
                <td>Varicella</td>
                <td>{vacc[22]?.Due_on ||''}</td>
                <td>{vacc[22]?.Given_on ||''}</td>
                <td>{vacc[22]?.Given_from ||''}</td>
                
            </tr>

            <tr>
                <th scope="row">2 Years</th>
                <td>Hepatitis A</td>
                <td>{vacc[23]?.Due_on ||''}</td>
                <td>{vacc[23]?.Given_on ||''}</td>
                <td>{vacc[23]?.Given_from ||''}</td>
                
            </tr>     
            </>
                )}

        </tbody>
        </table>
        </div>
    </div>
    <br /><br />

    </div>
  )
}

export default Adminvaccrec