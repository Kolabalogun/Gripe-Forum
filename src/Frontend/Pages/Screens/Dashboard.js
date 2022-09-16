import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useGlobalContext } from '../../../Functions/Context';
import { db } from '../../../Utils/Firebase';

const Dashboard = () => {


    const [complain, complainF] = useState(null);


    const { loader, setloader } = useGlobalContext()



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

    return (
        <div className='dashboard'>


            <div className='topauthnav'>
                <h1>Dashboard</h1>

            </div>

            <div className='notificationBox'>
                <h3>Recent Replies</h3>


            </div>
            <div className='reports'>
                <div className='report'>


                </div>

            </div>







        </div>
    )
}

export default Dashboard