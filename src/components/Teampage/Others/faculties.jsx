import React from 'react'
import '../../css/Faculties.css'
import Data from '../../Faculties.json';
function Faculties() {
    return (
        <>
            <section className="faculties">
                <div className="cards">
                    {
                        Data.map(data => {
                            return (<div className="profile">
                                <div className="img" key={data.id}><img src={data.image} alt="Profile of author" /></div>
                                <div className="name">{data.name}</div>
                                <div className="name">{data.rank}</div>
                            </div>

                            )
                        })
                    }
                </div>
            </section>
        </>
    )
}

export default Faculties