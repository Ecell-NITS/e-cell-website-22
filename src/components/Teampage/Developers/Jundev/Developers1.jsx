import React from 'react'
import './Developers.css'
import { FaFacebook, FaLinkedin } from 'react-icons/fa'
import { BsGithub } from 'react-icons/bs'
import Data from '../../../../Data/DevelopersJundev.json'

function Developers(){
return(
<>
<section className="junior-developers">
      <div className="jr_heading">
         <h1>JUNIOR DEVELOPERS</h1>
      </div>
   <div className="container_jrdev">
   {
      Data.map(data=>{
         return (
         <div className="jr-dev" key={data.id}>
         <div className="body">
            <div className="images_jrdev">
               <img src={data.image} alt="" />
            </div>
            <h3 className='jrdev_title'>{data.name}</h3>
         </div>
         <p className="jrdev_card_text">{data.rank}</p>
         <div className="social-media-jr">
            <a href={data.fb} className="MediaLogo-jr"><FaFacebook size={30}/></a>
            <a href={data.linkedln} className="MediaLogo-jr"><FaLinkedin  size={30}/></a> 
            <a href={data.git} className="MediaLogo-jr"><BsGithub size={30}/></a>
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