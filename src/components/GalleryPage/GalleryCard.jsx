import React from 'react'

function GalleryCard(props) {
  return (
    <div>
        <div className="card">
            <img src={props.imgsrc} alt="img" className="card-img-top" />
            <div className="card-body">
                <h5 className="card-title">{props.id}</h5>
             </div>
            </div>           
    </div>
  )
}

export default GalleryCard
