import React, { useState } from 'react'
import './Alumni.css'
import Data from '../../../Data/Alumni.json'
import ModalCard from '../Modal/ModalCardAlumni';
import { Modal, ModalBody, ModalHeader } from "reactstrap"
function Alumni() {
    const [modal, setmodal] = useState(false)
    const [modalid, setmodalid] = useState(1);
    return (
        <>
            <section className="alumni">
                <div className="cards">
                    {
                        Data.map(data => {
                            return (
                            <div key={data.id} className="profile" onClick={() => {
                                setmodalid(data.id)
                                setmodal(true)
                                }}>
                                <div className="img_alumni" ><img src={data.image} alt="Profile of author" /></div>
                                <div className="name_alumni">{data.name}</div>
                                <div className="desg_alumni">{data.rank}</div>
                            </div>

                            )
                        })
                    }
                </div>
                <Modal size='lg' isOpen={modal} toggle={() => setmodal(!modal)}>
                    <ModalHeader toggle={() => setmodal(!modal)}></ModalHeader>
                    <ModalBody>
                        <ModalCard dataid={modalid}/>                        
                    </ModalBody>
                </Modal>
            </section>
        </>
    )
}

export default Alumni
