import React from 'react'
import './Core.css'
import { FaFacebook, FaLinkedin } from 'react-icons/fa'
import { BsGithub } from 'react-icons/bs'
import Data from '../../../Data/Core2.json'

function CoreTeam1() {
   return (
      <>
         <section className="core_team">
      <div className="core_heading">
         <h1>Core Team</h1>
      </div>
   <div className="container">
   {
      Data.map(data=>{
         return (
         <div className="core-mem" key={data.id}>
         <div className="body">
            <div className="core-images">
               <img src={data.image} alt="" />
               </div>
            <h3 className='core-title'>{data.name}</h3>
         </div>
         <p className="core_mem_text">{data.rank}</p>
         <div className="social-media">
            <a href={data.fb} className="SocialLogo"><FaFacebook size={30}/></a>
            <a href={data.linkdln} className="SocialLogo"><FaLinkedin size={30}/></a> 
            {/* <a href={data.git} className="SocialLogo"><BsGithub size={30}/></a> */}
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

export default CoreTeam1;