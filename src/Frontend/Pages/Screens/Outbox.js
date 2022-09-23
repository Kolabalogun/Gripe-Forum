
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../../Backend/Components/Loader';
import { useGlobalContext } from '../../../Functions/Context';

import Footer from '../../Components/Footer';
import ReplyDetails from './ReplyDetails';


const Outbox = () => {

    const { loader, userId, complains, removeTags } = useGlobalContext()



    const { id } = useParams()

    useEffect(() => {
        id && DetailsPageF(true);
    }, [id]);


    const [DetailsPage, DetailsPageF] = useState(false)



 





    return (
        <div className='dashboard'>

            {
                loader ? <Loader /> : <>
                    <div style={{ minHeight: '70vh' }}>     <div className='topauthnav box'>
                        <h1>Outbox</h1>
                        <h3 className='insidenav'>Home  / Resend</h3>


                    </div>

                        {
                            DetailsPage ? <ReplyDetails /> :

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

                                                                        <p>{`${removeTags(report.description.substring(0, 100))}...`}</p>

                                                                        <button onClick={() => {
                                                                            toast('Complain Sent')
                                                                        }} className='btn'>Resend</button>


                                                                    </div>
                                                                );
                                                            }

                                                        }

                                                        )}
                                                    </>

                                                    :
                                                    <div className='notificationBox' style={{ backgroundColor: 'rgb(246, 249, 252)', textAlign: 'center' }}>
                                                        <img src='img/msg.png' alt='' />

                                                        <p style={{ marginTop: -40 }}>Your Outbox is empty</p>
                                                    </div>
                                            }
                                        </div>



                                    </div>
                                </>
                        }
                    </div>
                    <Footer />

                </>
            }

        </div >
    )
}

export default Outbox