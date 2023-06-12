import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const EditProfile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [bio, setBio] = useState("")
  const [userimg, setUserimg] = useState("")
  const [error, setError] = useState('');
  const [message, setMessage] = useState("")
  const [saving, setSaving] = useState(false)
  useEffect(() => {
    document.title = "Edit Profile | Dashboard"
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate])

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value)
  }

  const handleImgChange = (event) => {
    setUserimg(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    setSaving(true)
    axios
      // .put('http://localhost:2226/editprofile', { name, bio, userimg }, {
      .put(process.env.REACT_APP_EDITPROFILE, { name, bio, userimg }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMessage('Profile updated successfully');
        setTimeout(() => {
          setMessage("")
        }, 5000)
        setName('');
        setBio("")
        setUserimg("")
        setSaving(false)
      })
      .catch((error) => {
        console.error('Failed to update name', error);
        setError('Failed to update name. Please try again.');
        setSaving(false)
      });
    
  };


  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nameInput">Name:</label>
          <input
            type="text"
            id="nameInput"
            value={name}
            onChange={handleNameChange}
          />
        </div>

        <div>
          <label htmlFor="bioInput"> About:</label>
          <textarea id="bioInput" value={bio} onChange={handleBioChange} />
        </div>

        <div>
          <label htmlFor="ImgInput">Profile Image:</label>
          <input id="ImgInput" value={userimg} onChange={handleImgChange} />
        </div>


        <button type="submit">
          {saving ? "Saving..." : "Save"}
        </button>
      </form>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default EditProfile;
