import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Loader from '../../../Backend/Components/Loader';
import { useGlobalContext } from '../../../Functions/Context';
import { db } from '../../../Utils/Firebase';
import Footer from '../../Components/Footer';
import ReplyDetails from './ReplyDetails';


const Outbox = () => {

    const { setloader, loader, userId } = useGlobalContext()



    const [complains, complainsF] = useState([]);

    useEffect(() => {
        setloader(true);
        const unsub = onSnapshot(
            collection(db, "complains"),

            (snapshot) => {
                let list = [];

                snapshot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                });
                complainsF(list);
                setloader(false);
            },
            (error) => {
                console.log(error);
            }
        );

        return () => {
            unsub();
        };
    }, []);


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

                                                                        <p>{`${report.description.substring(0, 100)}...`}</p>
                                                                        <Link to={`/detail/${report.id}`}>
                                                                            <button className='btn'>See Details</button>
                                                                        </Link>

                                                                    </div>
                                                                );
                                                            }


                                                            // else if (report.reply.replyTxt === '') {
                                                            //   return (
                                                            //     <div className='notificationBox' style={{ backgroundColor: 'rgb(246, 249, 252)', textAlign: 'center' }}>
                                                            //       <img src='img/msg.png' alt='' />

                                                            //       <p style={{ marginTop: -40 }}>Your Outbox is empty</p>
                                                            //     </div>
                                                            //   )
                                                            // }

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