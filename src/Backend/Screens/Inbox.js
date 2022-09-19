import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Footer from '../../Frontend/Components/Footer';
import { useGlobalContext } from '../../Functions/Context';
import { db } from '../../Utils/Firebase';
import Loader from '../Components/Loader';
import Details from './Details';

const Inbox = () => {

    const { setloader, loader } = useGlobalContext()

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
                loader ? <Loader /> :

                    <>
                        <div style={{ minHeight: '70vh' }}>

                            <div className='topauthnav box'>
                                <h1>Inbox</h1>
                                <h3 className='insidenav'>Home  / Response</h3>
                            </div>

                            {
                                DetailsPage ? <Details /> :

                                    <>


                                        <div style={{ backgroundColor: 'transparent' }} className='notificationBox'>


                                            <div className='reports'>

                                                {
                                                    complains.length > 0 ?

                                                        <>

                                                            {complains.map((report, index) =>



                                                                <div key={index} className="report" >
                                                                    <h5>{report.title}</h5>

                                                                    <p>{`${report.description.substring(0, 100)}...`}</p>
                                                                    <Link to={`/admin/detail/${report.id}`}>
                                                                        <button className='btn'>See Complain</button>
                                                                    </Link>

                                                                </div>


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