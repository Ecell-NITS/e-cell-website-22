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
        const { name, email } = response.data; 
        setUser({ name, email }); 
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

  return (
    <>
      <p>This is a protected dashboard page</p>
      <div>
        <h1>Welcome to the Dashboard</h1>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <button onClick={ButtonSignout}>Sign Out</button>
      </div>
    </>
  )
}

export default Dashboard
