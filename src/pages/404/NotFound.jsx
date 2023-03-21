import React, { useEffect } from 'react'
import NavbarTeam from '../../components/shared/Navbar/NavbarTeam'
import './notfound.css'
import { Link } from 'react-router-dom'
const NotFound = () => {
    useEffect(() => {
        document.title = "404 | Not Found";
    }, []);
    
    return (
        <div>
            <NavbarTeam />
            <div className="notfound-main">
                <h1 style={{userSelect:'none'}} > Sorry. The page you requested doesn't exist.</h1>
                <div className="link-btn-btm" style={{userSelect:'none'}}>
                    <Link to="/"><p className='p-by'>Go Home</p></Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound