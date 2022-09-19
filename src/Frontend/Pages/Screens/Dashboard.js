import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Loader from '../../../Backend/Components/Loader';
import { useGlobalContext } from '../../../Functions/Context';
import { db } from '../../../Utils/Firebase';
import Footer from '../../Components/Footer';
import ReplyDetails from './ReplyDetails';

const Dashboard = () => {
    const { loader, setloader, user } = useGlobalContext()

    const userId = user?.uid

    // console.log(userId);


    const [complains, complainsF] = useState([
        {
            reply: {
                replyTxt: "",
                dateId: '',
            }
        }
    ]);

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




    const itemsToRenderCourse = complains.slice(0, 4);



    return (


        <div className='dashboard'>

            <>
                {loader ? <Loader /> :

                    <>

                        {DetailsPage ? <ReplyDetails /> :
                            <div>
                                <div style={{ flex: 2, minHeight: '70vh' }}>
                                    <div className='topauthnav'>
                                        <h1>Dashboard</h1>

                                    </div>

                                    <div style={{ backgroundColor: 'transparent' }} className='notificationBox'>
                                        <h3>            {
                                            complains.length > 0 ? 'Recent Replies' : 'Your Dashboard is empty'}</h3>


                                        <div className='reports'>

                                            {
                                                complains.length > 0 ?
                                                    <>
                                                        {itemsToRenderCourse.map((report, index) => {
                                                            // console.log(report);
                                                            if (report.reply.replyTxt !== '' && userId === report.userId) {

                                                                return (
                                                                    <div key={index} className="report" >
                                                                        <h5>Response From Admin</h5>

                                                                        <p>{`${report.reply.replyTxt.substring(0, 100)}...`}</p>
                                                                        <Link to={`/detail/${report.id}`}>
                                                                            <button className='btn'>See Reply</button>
                                                                        </Link>

                                                                    </div>
                                                                );
                                                            }

                                                            // else if (report.reply.replyTxt.length === 0 && userId !== report.userId) {
                                                            //     return (
                                                            //         <div className='notificationBox' style={{ backgroundColor: 'rgb(246, 249, 252)', textAlign: 'center' }}>
                                                            //             <img src='img/dash.png' alt='' />

                                                            //             <p style={{ marginTop: -40 }}>Your Dashboard is empty</p>
                                                            //         </div>
                                                            //     )
                                                            // }

                                                        }

                                                        )}</> :


                                                    <div className='notificationBox' style={{ backgroundColor: 'rgb(246, 249, 252)', textAlign: 'center' }}>
                                                        <img src='img/dash.png' alt='' />

                                                        <p style={{ marginTop: -40 }}>Your dashboard is empty</p>
                                                    </div>

                                            }







                                        </div>



                                    </div>
                                </div>
                                <Footer />

                            </div>
                        }


                    </>
                }
            </>















        </div >
    )
}

export default Dashboard                