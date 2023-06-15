import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../../../components/shared/Footer/Footer';
import NavbarTeam from '../../../components/shared/Navbar/NavbarTeam';
import './Editprofile.css'
const EditProfile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [bio, setBio] = useState("")
  const [userimg, setUserimg] = useState("")
  const [error, setError] = useState('');
  const [message, setMessage] = useState("")
  const [saving, setSaving] = useState(false)
  const [disableedit, setDisableedit] = useState(false)
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
    setDisableedit(true)
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
        setDisableedit(false)
      })
      .catch((error) => {
        console.error('Failed to update name', error);
        setError('Failed to update name. Please try again.');
        setSaving(false)
        setDisableedit(false)
      });

  };


  return (
    <div>

      <NavbarTeam />
      <div className='signuptopcont'>
        <div className="formcontsignup">
          <h1 className='okwelcometoecell'>Give your profile a new look</h1>
          <h4 className='enterdtlssignup'>Please enter your new details.</h4>
          <form onSubmit={handleSubmit} className='formsignaccoutn'>
            <div className="inputdicdignup">
              <h3>Name</h3>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className="inputdicdignup">
              <h3>About</h3>
              {/* <input
                type="text"
                placeholder="About"
                value={bio} onChange={handleBioChange}
              /> */}

              <textarea cols="10" rows="5" id="cretaeblogsinpt" typeof='text' 
                value={bio} onChange={handleBioChange}
                placeholder="Write your Bio"
                style={{ whiteSpace: "pre-wrap" }}></textarea>
            </div>

            <div className="inputdicdignup">
              <h3>Profile Image</h3>
              <input
                type="text"
                placeholder="new profile pic link"
                value={userimg} onChange={handleImgChange}
              />
            </div>

            <button type="submit" className='btnsubmittodb' disabled={disableedit} style={{ opacity: disableedit ? 0.5 : 1, cursor: disableedit ? "not-allowed" : "pointer" }}>
              {saving ? "Saving..." : "Save"}
            </button>

            {message && <p className='msgaftersignuplogin'>{message}</p>}
            {error && <p className='msgaftersignuplogin'>{error}</p>}



          </form>
        </div>

        <div className="imgbgholdersignup">
          <img src="https://res.cloudinary.com/dp92qug2f/image/upload/v1686499643/Photo_zxxmw5.svg" alt="" />
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default EditProfile;
