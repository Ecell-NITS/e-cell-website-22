import React from 'react'
import './GalleryCard.css'

function GalleryCard(props) {
  return (
    <div>
        <div className="Gallery_card">
            <div className="card_body">
                <h5 className="card_title">{props.id}</h5>
             </div>
            <img src={props.imgsrc} alt="img" className="card-img-top" />
            </div>           
    </div>
  )
}

export default GalleryCard
