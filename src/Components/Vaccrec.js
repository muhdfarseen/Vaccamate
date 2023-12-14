
import React, { useState,useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, {  tooltipClasses } from '@mui/material/Tooltip';
import jsPDF from 'jspdf';
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { supabase } from '../supabase/config';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'




function Vaccrec({token}) {

    const LightTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
      ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: theme.palette.common.white,
          color: 'rgba(0, 0, 0, 0.85)',
          boxShadow: theme.shadows[1],
          fontSize: 16,
        },
      }));



    let navigate = useNavigate()

    function handleLogout(){
        sessionStorage.removeItem('token')
        navigate('/')
    }

    const { bid } = useParams();

//------------------DB FETCH CHILD AND PARENT TABLE -----------------

const [child, setChild] = useState([]);
const [parent, setParent] = useState([]);

useEffect(() => {
    fetchChild();
}, []);

async function fetchChild() {
    const { data } = await supabase
        .from('Child_table')
        .select('BID, P_adhar, Child_name, DOB, Gender')
        .eq('BID', bid);

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
        .eq('BID', bid);

        const sortedData = data.sort((a, b) => parseInt(a.Vacc_num) - parseInt(b.Vacc_num));
        setVacc(sortedData);
        console.log(sortedData);
}


//------------------  DB FETCH VACC TABLE end -----------------



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

                
                <NavLink  to='/profile' className="nav-link"><b >{token.user.user_metadata.username}</b></NavLink>
                
                <button onClick={handleLogout} className="btn btnn btn-outline-danger btn-sm" >Log Out</button>

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



    <div className="container p-3">

        <h3 className="text-center">Immunisation Record</h3><br/> 
        <div className="tooltip">Hover over me
            <span className="tooltiptext">Tooltip text</span>
        </div>

        <div className="table-responsive">
        <table className="table  table-hover   table-bordered">
        <thead>
            <tr className="table-light">
            <th scope="col">Age</th>
            <th scope="col">Vaccine</th>
            <th scope="col">Due on</th>
            <th scope="col">Given on</th>
            <th scope="col">Given from</th>
            <th scope="col">info</th>
            </tr>
        </thead>


        
        <tbody >
        
        {vacc.length > 0 && (
        <>
                
                <tr >
                <th scope="row" rowSpan="3">Birth 14 days</th>
                <td>BCG </td>
                <td>{vacc[0]?.Due_on ||''}</td>
                <td>{vacc[0]?.Given_on ||''}</td>
                <td>{vacc[0]?.Given_from ||''}</td>
    
                <LightTooltip leaveDelay={200} TransitionProps={{ timeout: 600 }}
                    title="The BCG vaccine is usually given to newborns in countries with a high incidence of TB
                            The BCG vaccine is generally considered safe, but it can cause some side effects, such as redness and swelling at the injection site, fever, and fatigue. Serious side effects are rare
                            The BCG vaccine is usually given to newborns in countries with a high incidence of TB">
                    <td>
                        <img  src="/images/info.svg" alt="" width="20px"/>
                    </td>
                </LightTooltip>
             
                
            </tr>
            
            <tr>
                <td>Oral Polio Vaccine 10 dose</td>
                <td>{vacc[1]?.Due_on ||''}</td>
                <td>{vacc[1]?.Given_on ||''}</td>
                <td>{vacc[1]?.Given_from ||''}</td>
                <LightTooltip leaveDelay={200} TransitionProps={{ timeout: 600 }}
                    title="The Oral Polio Vaccine (OPV) is a vaccine given in 10 doses to provide protection against polio. It is administered orally and contains weakened strains of the poliovirus. By stimulating the immune system, OPV helps prevent polio infection and the transmission of the virus.">
                    <td>
                        <img  src="/images/info.svg" alt="" width="20px"/>
                    </td>
                </LightTooltip>
            </tr>
            <tr>
                <td>Hepatitis B Vaccine - 1st dose</td>
                <td>{vacc[2]?.Due_on ||''}</td>
                <td>{vacc[2]?.Given_on ||''}</td>
                <td>{vacc[2]?.Given_from ||''}</td>

                <LightTooltip leaveDelay={200} TransitionProps={{ timeout: 600 }}
                    title="
                    The Hepatitis B vaccine is a vaccine that provides protection against the Hepatitis B virus, a viral infection that affects the liver. The first dose of the vaccine is typically administered as part of a series of injections. It contains a harmless part of the virus that stimulates the immune system to produce antibodies, which are necessary for fighting off the virus in case of exposure. This initial dose helps to initiate the body's immune response and lays the foundation for subsequent doses in the vaccination schedule.">
                    <td>
                        <img  src="/images/info.svg" alt="" width="20px"/>
                    </td>
                </LightTooltip>
            </tr>

            {/* 2ND */}
            

            <tr>
                <th scope="row" rowSpan="4">6 Week</th>
                <td>DPT-1ST dose</td>
                <td>{vacc[3]?.Due_on ||''}</td>
                <td>{vacc[3]?.Given_on ||''}</td>
                <td>{vacc[3]?.Given_from ||''}</td>
                <LightTooltip leaveDelay={200} TransitionProps={{ timeout: 600 }}
                    title="The DPT vaccine, also known as the Diphtheria, Pertussis, and Tetanus vaccine, is a combination vaccine given in multiple doses to provide protection against these three diseases. The first dose is typically administered during infancy as part of the recommended vaccination schedule. It contains inactivated or toxoid forms of the bacteria that cause diphtheria and tetanus, as well as components of the pertussis bacteria, which stimulate the immune system to produce antibodies and develop immunity against these diseases. The first dose is crucial for initiating the immune response and building immunity for future doses in the vaccination series.">
                    <td>
                        <img  src="/images/info.svg" alt="" width="20px"/>
                    </td>
                </LightTooltip>
            </tr>
            <tr>
                <td>Oral Polio Vaccine - 1st dose</td>
                <td>{vacc[4]?.Due_on ||''}</td>
                <td>{vacc[4]?.Given_on ||''}</td>
                <td>{vacc[4]?.Given_from ||''}</td>
                <LightTooltip leaveDelay={200} TransitionProps={{ timeout: 600 }}
                    title="The Oral Polio Vaccine (OPV) is a vaccine given in multiple doses, with the first dose administered orally. It is designed to protect against polio, a highly contagious viral infection that affects the nervous system. The first dose of OPV contains weakened strains of the poliovirus, which stimulate the immune system to produce antibodies and develop immunity against the disease. This initial dose is crucial for initiating the immune response and providing the foundation for subsequent doses in the vaccination series.">
                    <td>
                        <img  src="/images/info.svg" alt="" width="20px"/>
                    </td>
                </LightTooltip>
            </tr>
            <tr>
                <td>Hepatitis B Vaccine -2nd dose</td>
                <td>{vacc[5]?.Due_on ||''}</td>
                <td>{vacc[5]?.Given_on ||''}</td>
                <td>{vacc[5]?.Given_from ||''}</td>
                <LightTooltip leaveDelay={200} TransitionProps={{ timeout: 600 }}
                    title="The second dose of the Hepatitis B vaccine is typically administered as part of the recommended vaccination schedule. This vaccine provides continued protection against the Hepatitis B virus, a viral infection that affects the liver. The second dose helps to strengthen the immune response initiated by the first dose, ensuring long-term immunity. It contains a harmless part of the virus that stimulates the immune system to produce antibodies, further enhancing the body's defense against Hepatitis B. The second dose is a crucial step in completing the vaccination series and achieving optimal protection against the virus"> 
                    <td>
                        <img  src="/images/info.svg" alt="" width="20px"/>
                    </td>
                </LightTooltip>
            </tr>
            <tr>
                <td>Hib I </td>
                <td>{vacc[6]?.Due_on ||''}</td>
                <td>{vacc[6]?.Given_on ||''}</td>
                <td>{vacc[6]?.Given_from ||''}</td>
                <LightTooltip leaveDelay={200} TransitionProps={{ timeout: 600 }}
                    title="Hib I (Haemophilus influenzae type b) vaccine is a vaccine that provides protection against Haemophilus influenzae type b, a bacteria that can cause severe infections in young children. The Hib I refers to the first dose of the vaccine, which is typically given in a series of doses. The vaccine contains parts of the Hib bacteria that stimulate the immune system to produce antibodies, helping to prevent Hib infections. The first dose of Hib I is an important step in initiating the immune response and providing protection against Haemophilus influenzae type b.">
                    <td>
                        <img  src="/images/info.svg" alt="" width="20px"/>
                    </td>
                </LightTooltip>
            </tr>

            {/* 3RD */}

            <tr>
                <th scope="row" rowSpan="3">10 weeks</th>
                <td>DPT - 2nd dose</td>
                <td>{vacc[7]?.Due_on ||''}</td>
                <td>{vacc[7]?.Given_on ||''}</td>
                <td>{vacc[7]?.Given_from ||''}</td>
                <LightTooltip leaveDelay={200} TransitionProps={{ timeout: 600 }}
                    title="The second dose of the DPT (Diphtheria, Pertussis, and Tetanus) vaccine is administered as part of the recommended vaccination schedule. This combination vaccine provides continued protection against diphtheria, pertussis (whooping cough), and tetanus. The second dose helps to strengthen and reinforce the immune response initiated by the first dose, ensuring long-term immunity against these diseases. It contains inactivated or toxoid forms of the bacteria that cause diphtheria and tetanus, as well as components of the pertussis bacteria, further boosting the body's defense mechanisms. The second dose is crucial for completing the vaccination series and maintaining optimal protection against these infectious diseases.">
                    <td>
                        <img  src="/images/info.svg" alt="" width="20px"/>
                    </td>
                </LightTooltip>
            </tr>
            <tr>
                <td>Oral Polio Vaccine - 2nd dose</td>
                <td>{vacc[8]?.Due_on ||''}</td>
                <td>{vacc[8]?.Given_on ||''}</td>
                <td>{vacc[8]?.Given_from ||''}</td>
                <LightTooltip leaveDelay={200} TransitionProps={{ timeout: 600 }}
                    title="The second dose of the Oral Polio Vaccine (OPV) is typically administered as part of the recommended vaccination schedule. OPV provides continued protection against polio, a highly contagious viral infection that affects the nervous system. The second dose helps to reinforce the immune response initiated by the first dose, further strengthening the body's immunity against the poliovirus. Like the first dose, the second dose of OPV is administered orally and contains weakened strains of the poliovirus, stimulating the immune system to produce antibodies and maintain long-term protection against polio. The second dose is crucial for completing the vaccination series and ensuring robust immunity against the disease.">
                    <td>
                        <img  src="/images/info.svg" alt="" width="20px"/>
                    </td>
                </LightTooltip>
            </tr>
            <tr>
                <td>Hib II</td>
                <td>{vacc[9]?.Due_on ||''}</td>
                <td>{vacc[9]?.Given_on ||''}</td>
                <td>{vacc[9]?.Given_from ||''}</td>
                <LightTooltip leaveDelay={200} TransitionProps={{ timeout: 600 }}
                    title="Hib II (Haemophilus influenzae type b) vaccine refers to the second dose of the vaccine given in a series to protect against Haemophilus influenzae type b infections. Haemophilus influenzae type b is a bacteria that can cause severe illnesses, especially in young children. The Hib II vaccine contains parts of the bacteria to stimulate the immune system and provide additional immunity against this specific strain. The second dose helps to reinforce and enhance the immune response initiated by the first dose, ensuring prolonged protection against Haemophilus influenzae type b infections.">
                    <td>
                        <img  src="/images/info.svg" alt="" width="20px"/>
                    </td>
                </LightTooltip>
            </tr>

            {/* 4TH */}

            <tr>
                <th scope="row" rowSpan="4">14 weeks</th>
                <td>DPT - 3rd dose</td>
                <td>{vacc[10]?.Due_on ||''}</td>
                <td>{vacc[10]?.Given_on ||''}</td>
                <td>{vacc[10]?.Given_from ||''}</td>
                <LightTooltip leaveDelay={200} TransitionProps={{ timeout: 600 }}
                    title="The third dose of the DPT (Diphtheria, Pertussis, and Tetanus) vaccine is given as part of the recommended vaccination schedule. This combination vaccine provides continued protection against diphtheria, pertussis (whooping cough), and tetanus. The third dose further strengthens the immune response initiated by the previous doses, ensuring long-term immunity against these diseases. It contains inactivated or toxoid forms of the bacteria that cause diphtheria and tetanus, as well as components of the pertussis bacteria, reinforcing the body's defense mechanisms. The third dose is vital for completing the vaccination series and maintaining optimal protection against these infectious diseases.">
                    <td>
                        <img  src="/images/info.svg" alt="" width="20px"/>
                    </td>
                </LightTooltip>
            </tr>
            <tr>
                <td>Oral Polio Vaccine - 3RD dose</td>
                <td>{vacc[11]?.Due_on ||''}</td>
                <td>{vacc[11]?.Given_on ||''}</td>
                <td>{vacc[11]?.Given_from ||''}</td>
                <LightTooltip leaveDelay={200} TransitionProps={{ timeout: 600 }}
                    title="The third dose of the Oral Polio Vaccine (OPV) is administered as part of the recommended vaccination schedule. OPV provides continued protection against polio, a highly contagious viral infection that affects the nervous system. The third dose reinforces the immune response initiated by the previous doses, further enhancing the body's immunity against the poliovirus. Like the previous doses, the third dose of OPV is administered orally and contains weakened strains of the poliovirus, stimulating the immune system to produce antibodies and maintain long-term protection against polio. The third dose is crucial for completing the vaccination series and ensuring robust and sustained immunity against the disease.">
                    <td>
                        <img  src="/images/info.svg" alt="" width="20px"/>
                    </td>
                </LightTooltip>
            </tr>
            <tr>
                <td>Hepatitise B Vaccine - 3rd dose</td>
                <td>{vacc[12]?.Due_on ||''}</td>
                <td>{vacc[12]?.Given_on ||''}</td>
                <td>{vacc[12]?.Given_from ||''}</td>
                <LightTooltip leaveDelay={200} TransitionProps={{ timeout: 600 }}
                    title="The third dose of the Hepatitis B vaccine is typically administered as part of the recommended vaccination schedule. This vaccine provides continued and complete protection against the Hepatitis B virus, a viral infection that affects the liver. The third dose further strengthens the immune response initiated by the previous doses, ensuring long-lasting immunity. It contains a harmless part of the virus that stimulates the immune system to produce high levels of antibodies, offering robust defense against Hepatitis B. The third dose is crucial for completing the vaccination series and achieving maximum protection against the virus.">
                    <td>
                        <img  src="/images/info.svg" alt="" width="20px"/>
                    </td>
                </LightTooltip>
            </tr>
            <tr>
                <td>HIB III</td>
                <td>{vacc[13]?.Due_on ||''}</td>
                <td>{vacc[13]?.Given_on ||''}</td>
                <td>{vacc[13]?.Given_from ||''}</td>
                <LightTooltip leaveDelay={200} TransitionProps={{ timeout: 600 }}
                    title="HIB III refers to the third dose of the Haemophilus influenzae type b (Hib) vaccine. Hib is a bacteria that can cause severe infections, especially in young children. The HIB III vaccine is administered as part of the recommended vaccination schedule to provide continued and enhanced protection against Haemophilus influenzae type b infections. The third dose strengthens the immune response initiated by the previous doses, ensuring long-term immunity against this specific strain. It contains parts of the bacteria that stimulate the immune system, further reinforcing the body's defense against Haemophilus influenzae type b infections.">
                    <td>
                        <img  src="/images/info.svg" alt="" width="20px"/>
                    </td>
                </LightTooltip>
            </tr>

            {/* 5TH */}

            <tr>
                <th scope="row">9 Months</th>
                <td>Measles Vaccine</td>
                <td>{vacc[14]?.Due_on ||''}</td>
                <td>{vacc[14]?.Given_on ||''}</td>
                <td>{vacc[14]?.Given_from ||''}</td>
                <LightTooltip leaveDelay={200} TransitionProps={{ timeout: 600 }}
                    title="The Measles vaccine is a vaccine that provides protection against the measles virus, a highly contagious viral infection. It is typically given in a series of doses as part of the recommended vaccination schedule. The vaccine contains a weakened or inactivated form of the measles virus, which stimulates the immune system to produce antibodies. These antibodies help the body recognize and fight off the virus in case of future exposure. The Measles vaccine is an effective way to prevent measles and its complications, ensuring individual and community immunity against this infectious disease.">
                    <td>
                        <img  src="/images/info.svg" alt="" width="20px"/>
                    </td>
                </LightTooltip>
            </tr>

            {/* 6TH */}

            <tr>
                <th scope="row">15 months</th>
                <td>MMR(Measles mumps Rubella)</td>
                <td>{vacc[15]?.Due_on ||''}</td>
                <td>{vacc[15]?.Given_on ||''}</td>
                <td>{vacc[15]?.Given_from ||''}</td>
                <LightTooltip leaveDelay={200} TransitionProps={{ timeout: 600 }}
                    title="The MMR vaccine, also known as the Measles, Mumps, and Rubella vaccine, is a combination vaccine that provides protection against these three viral infections. It is typically administered in a series of doses as part of the recommended vaccination schedule. The vaccine contains weakened or inactivated forms of the viruses, stimulating the immune system to produce antibodies for each disease. MMR vaccine is an effective way to prevent measles, mumps, and rubella, reducing the risk of severe complications and promoting public health by preventing the spread of these highly contagious diseases.">
                    <td>
                        <img  src="/images/info.svg" alt="" width="20px"/>
                    </td>
                </LightTooltip>
            </tr>
            
            {/* 7TH */}

            <tr>
                <th scope="row" rowSpan="2">18 Months</th>
                <td>DPT - Hib booster</td>
                <td>{vacc[16]?.Due_on ||''}</td>
                <td>{vacc[16]?.Given_on ||''}</td>
                <td>{vacc[16]?.Given_from ||''}</td>
                <LightTooltip leaveDelay={200} TransitionProps={{ timeout: 600 }}
                    title="The DPT-Hib booster vaccine is a combination vaccine that provides a booster dose of protection against diphtheria, pertussis (whooping cough), tetanus, and Haemophilus influenzae type b (Hib) infections. It is administered as part of the recommended vaccination schedule for children. The booster dose reinforces the immune response initiated by the initial doses, ensuring long-lasting immunity against these diseases. It contains inactivated or toxoid forms of the bacteria and components of the pertussis bacteria and Hib, further enhancing the body's defense against these infections. The DPT-Hib booster is crucial for maintaining optimal protection and preventing severe illnesses caused by these pathogens.">
                    <td>
                        <img  src="/images/info.svg" alt="" width="20px"/>
                    </td>
                </LightTooltip>

            </tr>
            <tr>
                <td>Oral Polio Vaccine</td>
                <td>{vacc[17]?.Due_on ||''}</td>
                <td>{vacc[17]?.Given_on ||''}</td>
                <td>{vacc[17]?.Given_from ||''}</td>
                <LightTooltip leaveDelay={200} TransitionProps={{ timeout: 600 }}
                    title="The Oral Polio Vaccine (OPV) is a vaccine administered orally to protect against polio, a highly contagious viral disease that affects the nervous system. It contains weakened forms of the poliovirus, which stimulate the immune system to produce antibodies and develop immunity against polio. OPV is effective in preventing both the transmission of the virus and the occurrence of the disease itself. It is typically given in multiple doses as part of routine immunization programs to ensure long-term protection against polio.">
                    <td>
                        <img  src="/images/info.svg" alt="" width="20px"/>
                    </td>
                </LightTooltip>
            </tr>

            {/*  */}

            <tr>
                <th scope="row">2 Years</th>
                <td>Typhoid</td>
                <td>{vacc[18]?.Due_on ||''}</td>
                <td>{vacc[18]?.Given_on ||''}</td>
                <td>{vacc[18]?.Given_from ||''}</td>
                <LightTooltip leaveDelay={200} TransitionProps={{ timeout: 600 }}
                    title="Typhoid vaccination is a preventive measure against typhoid fever, a bacterial infection caused by Salmonella typhi. The vaccine helps to stimulate the immune system to produce antibodies that target the bacteria. It is available in two forms: oral and injectable. The vaccine is commonly recommended for individuals traveling to areas with a high risk of typhoid transmission or for those who may come into contact with the bacteria through contaminated food or water. Vaccination provides a significant level of protection against typhoid and can help prevent the occurrence of the disease.">
                    <td>
                        <img  src="/images/info.svg" alt="" width="20px"/>
                    </td>
                </LightTooltip>
            </tr>

            <tr>
                <th scope="row">5 Years</th>
                <td>DT/DPT - Booster</td>
                <td>{vacc[19]?.Due_on ||''}</td>
                <td>{vacc[19]?.Given_on ||''}</td>
                <td>{vacc[19]?.Given_from ||''}</td>
                <LightTooltip leaveDelay={200} TransitionProps={{ timeout: 600 }}
                    title="The DT/DPT booster vaccine is a combination vaccine that provides a booster dose of protection against diphtheria, tetanus, and pertussis (whooping cough). It is typically administered to individuals who have previously received the primary doses of the vaccine series. The booster dose helps to reinforce the immune response and maintain long-term immunity against these diseases. The vaccine contains inactivated or toxoid forms of the bacteria that cause diphtheria and tetanus, as well as components of the pertussis bacteria, further enhancing the body's defense against these infections. The DT/DPT booster is essential for sustaining optimal protection and preventing severe illnesses caused by these pathogens.">
                    <td>
                        <img  src="/images/info.svg" alt="" width="20px"/>
                    </td>
                </LightTooltip>
            </tr>

            <tr>
                <th scope="row">10 Years</th>
                <td>TT(Tetanus)- booster</td>
                <td>{vacc[20]?.Due_on ||''}</td>
                <td>{vacc[20]?.Given_on ||''}</td>
                <td>{vacc[20]?.Given_from ||''}</td>
                <LightTooltip leaveDelay={200} TransitionProps={{ timeout: 600 }}
                    title="The TT (Tetanus) booster vaccine provides a booster dose of protection against tetanus, a potentially life-threatening bacterial infection. It is typically given to individuals who have previously completed the primary tetanus vaccination series. The booster dose helps to reinforce the immune response and maintain long-term immunity against tetanus. The vaccine contains inactivated or toxoid forms of the bacteria that cause tetanus, stimulating the immune system to produce antibodies that provide protection against the infection. The TT booster is crucial for sustaining optimal protection and preventing tetanus-related complications.">
                    <td>
                        <img  src="/images/info.svg" alt="" width="20px"/>
                    </td>
                </LightTooltip>
            </tr>

            <tr>
                <th scope="row">16 Years</th>
                <td>TT(Tetanus) - booster</td>
                <td>{vacc[21]?.Due_on ||''}</td>
                <td>{vacc[21]?.Given_on ||''}</td>
                <td>{vacc[21]?.Given_from ||''}</td>
                <LightTooltip leaveDelay={200} TransitionProps={{ timeout: 600 }}
                    title="The TT (Tetanus) booster vaccine provides a booster dose of protection against tetanus, a potentially life-threatening bacterial infection. It is typically given to individuals who have previously completed the primary tetanus vaccination series. The booster dose helps to reinforce the immune response and maintain long-term immunity against tetanus. The vaccine contains inactivated or toxoid forms of the bacteria that cause tetanus, stimulating the immune system to produce antibodies that provide protection against the infection. The TT booster is crucial for sustaining optimal protection and preventing tetanus-related complications.">
                    <td>
                        <img  src="/images/info.svg" alt="" width="20px"/>
                    </td>
                </LightTooltip>
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
                <LightTooltip leaveDelay={200} TransitionProps={{ timeout: 600 }}
                    title="Varicella vaccine is a vaccine that provides protection against varicella-zoster virus, which causes chickenpox. It is typically administered in childhood as part of the routine immunization schedule. The vaccine contains weakened forms of the virus, stimulating the immune system to produce antibodies and develop immunity against chickenpox. Varicella vaccine is highly effective in preventing chickenpox and its complications, such as skin infections and pneumonia. It is an essential tool in reducing the burden of chickenpox and promoting overall public health.">
                    <td>
                        <img  src="/images/info.svg" alt="" width="20px"/>
                    </td>
                </LightTooltip>
            </tr>

            <tr>
                <th scope="row">2 Years</th>
                <td>Hepatitis A</td>
                <td>{vacc[23]?.Due_on ||''}</td>
                <td>{vacc[23]?.Given_on ||''}</td>
                <td>{vacc[23]?.Given_from ||''}</td>
                <LightTooltip leaveDelay={200} TransitionProps={{ timeout: 600 }}
                    title="Hepatitis A vaccine is a vaccine that provides protection against the Hepatitis A virus, a contagious viral infection that affects the liver. It is typically given in two doses, with the second dose administered 6 to 18 months after the first dose. The vaccine contains inactivated forms of the virus, stimulating the immune system to produce antibodies and develop immunity against Hepatitis A. Hepatitis A vaccine is highly effective in preventing Hepatitis A infection and its associated symptoms, such as jaundice, fatigue, and abdominal pain. It is recommended for individuals at risk of exposure to the virus, including travelers to endemic areas and certain high-risk groups.">
                    <td>
                        <img  src="/images/info.svg" alt="" width="20px"/>
                    </td>
                </LightTooltip>
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
export default Vaccrec