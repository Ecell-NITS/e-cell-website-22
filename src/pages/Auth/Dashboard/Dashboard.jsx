import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
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
        const { name, email, bio ,userimg} = response.data; 
        setUser({ name, email, bio,userimg }); 
      })
      .catch(error => {
        if(error.response.status === 401 ){
          navigate('/login');
        }else {
          console.error('Failed to retrieve user details', error);
        }
       
      });
  }, []);


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

  const handleallblogsbtn = () =>{
    navigate("/mypublishedblogs")
  }

  const handleallprovblogs = () => {
    navigate("/myallblogs")
  }
  
  return (
    <>
      <p>This is a protected dashboard page</p>
      <div>
        <h1>Welcome to the Dashboard, {user.name}</h1>
        <div>
          <img src={user.userimg} alt="" />
        </div>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Bio: {user.bio}</p>
        <button onClick={ButtonSignout}>Sign Out</button>
        <button onClick={handleEditProfile}>Edit Profile</button>
        <button onClick={handleallblogsbtn}>My Published blogs</button>
        <button onClick={handleallprovblogs}>My all blogs</button>
      </div>
    </>
  )
}

export default Dashboard
