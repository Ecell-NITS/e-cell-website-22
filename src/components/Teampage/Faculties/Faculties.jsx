import React, { useState } from 'react'
import './Faculties.css'
import Data from '../../../Data/Faculties.json'
import ModalCard from '../Alumni/Modal/ModalCardFaculties';
import { Modal, ModalBody, ModalHeader } from "reactstrap"
function Faculties() {
    const [modal, setmodal] = useState(false)
    const [modalid, setmodalid] = useState(1);
    return (
        <>
            <section className="faculties">
                <div className="cards">
                    {
                        Data.map(data => {
                            return (
                            <div key={data.id} className="profile" onClick={() => {
                                setmodalid(data.id)
                                setmodal(true)
                                }}>
                                <div className="img_faculties" ><img src={data.image} alt="Profile of author" /></div>
                                <div className="name_faculties">{data.name}</div>
                                <div className="desg_faculties">{data.rank}</div>
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

export default Faculties
