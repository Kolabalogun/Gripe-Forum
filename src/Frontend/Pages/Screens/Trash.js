import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import Loader from '../../../Backend/Components/Loader';
import { useGlobalContext } from '../../../Functions/Context';
import { db } from '../../../Utils/Firebase';
import Footer from '../../Components/Footer';




const Trash = () => {

    const { loader, handleDelete, complains, userId } = useGlobalContext()



    return (
        <div className='dashboard'>
            {loader ? <Loader />
                :
                <>
                    <div style={{ minHeight: '70vh' }}>

                        <div className='topauthnav'>
                            <h1>Trash Message</h1>

                        </div>
                        <>


                            <div style={{ backgroundColor: 'transparent' }} className='notificationBox'>



                                <div className='reports'>

                                    {
                                        complains.length > 0 ?

                                            <>

                                                {complains.map((report, index) => {
                                                    if (userId === report.userId) {
                                                        return (
                                                            <div key={index} className="report" >
                                                                <h5>{report.title}</h5>

                                                                <p>{`${report.description.substring(0, 100)}...`}</p>

                                                                <button onClick={() => {
                                                                    handleDelete(report.id)
                                                                }} style={{ backgroundColor: 'red' }} className='btn'>Delete</button>


                                                            </div>
                                                        );
                                                    }

                                                })}
                                            </>

                                            :
                                            <div className='notificationBox' style={{ backgroundColor: 'rgb(246, 249, 252)', textAlign: 'center' }}>
                                                <img src='img/trash.png' alt='' />

                                                <p style={{ marginTop: -40 }}>Sorry, there's nothing here!</p>
                                            </div>
                                    }






                                </div>



                            </div>
                        </>


                    </div>
                    <Footer />
                </>}









        </div >
    )
}

export default Trash