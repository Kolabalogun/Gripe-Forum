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

            {loader ? <Loader /> :
                <div>
                    <div style={{ flex: 2, minHeight: '70vh' }}>
                        <div className='topauthnav'>
                            <h1>Dashboard</h1>
                        </div>






                        <div className='dash'>
                            <div className='dashBox chart'>
                                <h1>Charts</h1>
                            </div>
                            <div className='dashBox replys'>
                                <h3 className='complainheader'>Recent Replies</h3>
                                <div className='reply-section'>


                                    {complains.map((report, index) => {
                                        if (report.reply.replyTxt !== '' && userId === report.userId) {
                                            return (
                                                <div key={index} className='replyswithTime'>
                                                    <div className='time'>
                                                        32 min
                                                    </div>
                                                    <div className='divider'>
                                                        <span className='dot'>

                                                        </span>
                                                        <span className='line'>

                                                        </span>

                                                    </div>
                                                    <div className='msgggg'>
                                                        {`${report.reply.replyTxt.substring(0, 35)}...`}
                                                    </div>
                                                </div>
                                            );
                                        }


                                    }

                                    )}





                                </div>

                            </div>
                        </div>







                    </div>
                    <Footer />

                </div>



            }
        </div >
    )
}

export default Dashboard                