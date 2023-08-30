import React from 'react'
import './Modal.css'
import Data from '../../../Data/Faculties.json'

function ModalCard({dataid}) {
    let imgsrc = "", name = "", content = "", rank = "";
    for(const item of Data){
        if (item.id === dataid){
            imgsrc = item.image2;
            name = item.name;
            rank = item.rank;
            content = item.content;
            break;
        }
    }
    return (
        <>
            <div className="modalCard">

                <div className="profileCard" key={dataid}>
                    <div className="profile2">
                        <div className="img2" ><img src={imgsrc} alt="Profile of author" /></div>
                        <div className="name_modal one">{name}</div>
                        <div className="desg_modal two">{rank}</div>
                    </div>
                    <div className="content">{content}</div></div>

            </div>
        </>
    )
}
export default ModalCard