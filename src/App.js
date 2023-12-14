import Homepage from './Components/Homepage';
import Signup from './Components/Signup';
import Signin from './Components/Signin';
import Parent from './Components/Parent';
import Vaccrec from './Components/Vaccrec';
import Editprofile from './Components/Editprofile';
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import AdminLogin from './Components/AdminLogin';
import Usersearch from './Components/Usersearch';
import Profilehp from './Components/Profilehp';
import AdminEditProfile from './Components/AdminEditProfile';
import Createchild from './Components/Createchild';
import Adminvaccrec from './Components/Adminvaccrec';
import { useEffect, useState } from 'react';

function App() {
  const [token, setToken] = useState(false);

  if (token) {
    sessionStorage.setItem('token', JSON.stringify(token));
  }

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      let data = JSON.parse(sessionStorage.getItem('token'));
      setToken(data);
    }
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin setToken={setToken} />} />

          {token ? (
            <>
              <Route path="/profile" element={<Parent token={token} />} />
              <Route path="/Vaccrec/:bid" element={<Vaccrec token={token} />} />
              <Route path="/editprofile" element={<Editprofile token={token} />} />
            </>
          ) : null}

          <Route path="/adminlogin" element={<AdminLogin />} />

          <Route path="/usersearch" element={<Usersearch />} />

          <Route path="/profilehp/:searchValue" element={<Profilehp />} />

          <Route path="/admineditprofile/:searchValue" element={<AdminEditProfile />} />

          <Route path="/createchild/:searchValue" element={<Createchild />} />

          <Route path="/adminvaccrec/:bid/:Adhar" element={<Adminvaccrec />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
