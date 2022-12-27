import React from 'react'
import '../css/Modal.css'
import Data from '../Modal.json';

function ModalCard() {
    return (
        <>
            <div className="modalCard">

                {
                    Data.map(data => {
                        return (<div className="profileCard">
                            <div className="profile2">
                                <div className="img2" key={data.id}><img src={data.image2} alt="Profile of author" /></div>
                                <div className="name">{data.name}</div>
                                <div className="name1">{data.rank}</div>
                            </div>
                            <div className="content">{data.content}</div></div>
                        )
                    })
                }
            </div>
        </>
    )
}
export default ModalCard