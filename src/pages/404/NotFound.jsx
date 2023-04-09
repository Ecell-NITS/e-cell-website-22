import React, { useEffect } from 'react'
import NavbarTeam from '../../components/shared/Navbar/NavbarTeam'
import './notfound.css'
import Footer from '../../components/shared/Footer/Footer'
import Error from '../../assets/404.json'
import Lottie from "lottie-react"
const NotFound = () => {
    useEffect(() => {
        document.title = "404 | Not Found";
    }, []);
    
    return (
        <div>
            <NavbarTeam />
            <div className="notfound-main">
                <Lottie className='error' animationData={Error}/>
                
                
                    
               
            </div>
            <Footer/>
        </div>
    )
}

export default NotFound