import { useEffect, useState } from 'react';
import { NavLink, useParams } from "react-router-dom";
import { supabase } from '../supabase/config';

function AdminChild({ Aadhar, searchValue }) {
  const [child, setChild] = useState([]);

  

  useEffect(() => {
    fetchChild();
  }, []);

  async function fetchChild() {
    const { data, error } = await supabase
      .from('Child_table')
      .select('BID, Child_name, DOB, Gender')
      .eq('P_adhar', Aadhar);

    if (error) {
      console.error('Error fetching child data:', error);
      return;
    }

    setChild(data || []);
  }

  return (
    <div>
      {child && child.length > 0 ? (
        child.map((userItem) => (
          <div className="container pt-5 pb-0" key={userItem.BID}>
            <div className="card text-dark bg-light">
              <div className="card-body">
                <h5 className="card-title">{userItem.Child_name}</h5>
                <p className="card-text">
                  <b>Date of Birth :</b> {userItem.DOB} <br />
                  <b>Gender :</b> {userItem.Gender} <br />
                  <b>Birth Certificate ID :</b> {userItem.BID}
                </p>
                <NavLink
                    to={`/adminvaccrec/${searchValue}/${userItem.BID}`}
                    className="btn btn-primary mb-2"
                    style={{ marginRight: "10px" }}
                    as="adminVaccRec"
                    >
                    <img className="me-1" src="/images/eye.svg" width="15px" alt="" /> View Vaccine Record
                </NavLink>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default AdminChild;

