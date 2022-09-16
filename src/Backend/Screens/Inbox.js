import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useGlobalContext } from '../../Functions/Context';
import { db } from '../../Utils/Firebase';
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


            <div className='topauthnav'>
                <h1>Inbox</h1>

            </div>

            {
                DetailsPage ? <Details /> :

                    <>


                        <div style={{ backgroundColor: 'transparent' }} className='notificationBox'>
                            {/* <h3>Recent Complains</h3> */}


                            <div className='reports'>


                                {complains.map((report, index) =>

                                    <div key={index} className="report" >
                                        <h5>{report.title}</h5>

                                        <p>{`${report.description.substring(0, 100)}...`}</p>
                                        <Link to={`/admin/detail/${report.id}`}>
                                            <button className='btn'>See Complain</button>
                                        </Link>

                                    </div>


                                )}




                            </div>



                        </div>
                    </>
            }






        </div >
    )
}

export default Inbox