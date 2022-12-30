import React from 'react'
import '../../css/Core.css'
import { FaFacebook, FaLinkedin } from 'react-icons/fa'
import { BsGithub } from 'react-icons/bs'
import Data from '../../Core.json'

function Core(){
return(
<>
<section className="core-team">
      <div className="heading">
         <h1>Core Team</h1>
         <h2 className='core-year'>2022-2023</h2>
      </div>
   <div className="container">
   {
      Data.map(data=>{
         return (
         <div className="core-mem" key={data.id}>
         <div className="body">
            <div className="images">
               <img src={data.image} alt="" />
               </div>
            <h3 className='title'>{data.name}</h3>
         </div>
         <p className="text">{data.rank}</p>
         <div className="core-social-media">
            <a href={data.fb} className="core-socialMediaLogo"><FaFacebook size={30}/></a>
            <a href={data.linkedln} className="core-socialMediaLogo"><FaLinkedin size={30}/></a> 
            <a href={data.git} className="core-socialMediaLogo"><BsGithub size={30}/></a>
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

export default Core;