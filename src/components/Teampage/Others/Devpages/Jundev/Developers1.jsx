import React from 'react'
import './Developers.css'
import { FaFacebook, FaLinkedin } from 'react-icons/fa'
import { BsGithub } from 'react-icons/bs'
import Data from './Developers.json'

function Developers(){
return(
<>
<section className="junior-developers">
      <div className="heading">
         <h1>JUNIOR DEVELOPERS</h1>
      </div>
   <div className="container">
   {
      Data.map(data=>{
         return (
         <div className="jr-dev" key={data.id}>
         <div className="body">
            <div className="images">
               <img src={data.image} alt="" />
               </div>
            <h3 className='title'>{data.name}</h3>
         </div>
         <p className="dev_card_text">{data.rank}</p>
         <div className="social-media">
            <a href={data.fb} className="MediaLogo"><FaFacebook size={30}/></a>
            <a href={data.linkedln} className="MediaLogo"><FaLinkedin size={30}/></a> 
            <a href={data.git} className="MediaLogo"><BsGithub size={30}/></a>
         </div>
      </div>
         )
      })
   }
</div>
</section>
</>
)
}

export default Developers;