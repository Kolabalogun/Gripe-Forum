
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Loader from '../../../Backend/Components/Loader';

import { useGlobalContext } from '../../../Functions/Context';

import Footer from '../../Components/Footer';
import ReplyDetails from './ReplyDetails';



const Inbox = () => {

    const { loader, complains, userId } = useGlobalContext()

    const { id } = useParams()



    useEffect(() => {
        id && DetailsPageF(true);
    }, [id]);


    const [DetailsPage, DetailsPageF] = useState(false)




    return (
        <div className='dashboard'>

            {loader ? <Loader /> :


                <>
                    <div style={{ minHeight: '70vh' }}>

                        <div className='topauthnav box'>
                            <h1>Inbox</h1>
                            <h3 className='insidenav'>Home  / Response</h3>

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
                                                            if (report.reply.replyTxt !== '' && userId === report.userId) {
                                                                return (
                                                                    <div key={index} className="report" >
                                                                        <h5>Response From Admin</h5>

                                                                        <p>{`${report.reply.replyTxt.substring(0, 100)}...`}</p>
                                                                        <Link to={`/detail/${report.id}`}>
                                                                            <button className='btn'>See Details</button>
                                                                        </Link>

                                                                    </div>
                                                                );
                                                            }


                                                        }

                                                        )}
                                                    </>
                                                    :
                                                    <div className='notificationBox' style={{ backgroundColor: 'rgb(246, 249, 252)', textAlign: 'center' }}>
                                                        <img src='img/aa.png' alt='' />

                                                        <p style={{ marginTop: -40 }}>Your Inbox is empty</p>
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

export default Inbox