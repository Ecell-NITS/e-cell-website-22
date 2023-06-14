import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import NavbarTeam from '../../../components/shared/Navbar/NavbarTeam';
import Footer from '../../../components/shared/Footer/Footer';
import './Dashboard.css'
import Allblogspublished from './Allblogswritten';
import Allprovblogs from './Allprovblogs';
import Alllikedblogs from './Alllikedblogs';
const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // axios.get('http://localhost:2226/dashboard', 
    axios.get(process.env.REACT_APP_DASHBOARD,
      config)
      .then(response => {
        const { name, email, bio, userimg } = response.data;
        setUser({ name, email, bio, userimg });
      })
      .catch(error => {
        if (error.response.status === 401) {
          navigate('/login');
        } else {
          console.error('Failed to retrieve user details', error);
        }

      });
  }, [navigate]);


  useEffect(() => {
    document.title = "Dashboard | ECELL NITS"
  }, [])

  const ButtonSignout = () => {
    console.log('Signout button clicked');
    localStorage.removeItem('token');
    alert('You have been signed out');
    navigate("/login")
  };

  const handleEditProfile = () => {
    navigate('/editprofile');
  };

  const handleallblogsbtn = () => {
    navigate("/mypublishedblogs")
  }

  const handleallprovblogs = () => {
    navigate("/myallblogs")
  }

  const handlelikedblogs = () => {
    navigate("/likedblogs")
  }

  const [lebel12, setlebel12] = useState("publishedblogs");

  return (
    <>
      <NavbarTeam />
      <div className='dashboardmain'>

        <div className="flexingphotocontent">
          <div className="phhotodash">
            <img src={user.userimg} alt={user.name} />
          </div>
          <div className="biodashboardd">
            <div className="firstseconndchild">

              {/* <div className="namenadbtnsinsame">
                <div className="usernamehlderdash">
                  <h1 className='accountusername'>{user.name}</h1>
                </div>

                <div className="btnholrgdashbo">
                  <div className='profeftcontparnt'>
                    <button onClick={handleEditProfile} className='editkryieprof' >Edit Profile</button>
                    <button onClick={ButtonSignout} className='editkryieprof'>Sign Out</button>
                  </div>
                </div>
              </div> */}
              <h1 className='accountusername'>{user.name}</h1>
              <button onClick={handleEditProfile} className='editkryieprof ' id='sirfcolorchng' >Edit Profile</button>
              <button onClick={ButtonSignout} className='editkryieprof'>Sign Out</button>
            </div>

            <div className="biohbhauidhar">
              <h3>{user.bio}</h3>
            </div>


          </div>
        </div>


        <div className="tab_main" id='tabchangerdashboard'>
          <div
            className={`publishedblogs ${lebel12 === "publishedblogs" ? "active-link" : ""}`}
            onClick={() => { setlebel12("publishedblogs") }}
          >
            Published Blogs
          </div>

          <div
            className={`allblogs ${lebel12 === "allblogs" ? "active-link" : ""}`}
            onClick={() => { setlebel12("allblogs") }}
          >
            ALL BLOGS
          </div>

          <div
            className={`likedblogs ${lebel12 === "likedblogs" ? "active-link" : ""}`}
            onClick={() => { setlebel12("likedblogs") }}
          >
            LIKED BLOGS
          </div>

        </div>

        <div className="tab_content">
          {lebel12 === "publishedblogs" && <Allblogspublished />}
          {lebel12 === "allblogs" && <Allprovblogs />}
          {lebel12 === "likedblogs" && <Alllikedblogs />}

        </div>
      </div>

      <Footer />
    </>
  )
}

export default Dashboard
