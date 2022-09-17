import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Loader from '../../../Backend/Components/Loader';
import Details from '../../../Backend/Screens/Details';
import { useGlobalContext } from '../../../Functions/Context';
import { db } from '../../../Utils/Firebase';
import Footer from '../../Components/Footer';




const Trash = () => {

    const { setloader, loader, handleDelete, user } = useGlobalContext()


    const userId = user?.id

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
                setloader(false)
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


            {loader ? <Loader />


                :

                <>
                    <div style={{ minHeight: '70vh' }}>

                        <div className='topauthnav'>
                            <h1>Trash</h1>

                        </div>

                        {
                            DetailsPage ? <Details /> :

                                <>


                                    <div style={{ backgroundColor: 'transparent' }} className='notificationBox'>
                                        {/* <h3>Recent Complains</h3> */}


                                        <div className='reports'>

                                            {
                                                complains.length > 0 ?

                                                    <>

                                                        {complains.map((report, index) => {
                                                            if (report.reply.replyTxt !== '' && userId === report.userId) {
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
                        }

                    </div>
                    <Footer />
                </>}









        </div >
    )
}

export default Trash