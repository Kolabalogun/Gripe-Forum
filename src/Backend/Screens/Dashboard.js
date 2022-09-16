import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useGlobalContext } from '../../Functions/Context';
import { db } from '../../Utils/Firebase';
import Details from './Details';

const Dashboard = () => {

  const [courses, coursesF] = useState([]);

  useEffect(() => {
    // setloader(true);
    const unsub = onSnapshot(
      collection(db, "complains"),

      (snapshot) => {
        let list = [];

        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        coursesF(list);

      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const itemsToRenderCourse = courses.slice(0, 4);



  const { pageStateF, loader, setloader } = useGlobalContext()




  return (
    <div className='dashboard'>




      <>
        <div className='topauthnav'>
          <h1>Dashboard</h1>

        </div>

        <div style={{ backgroundColor: 'transparent' }} className='notificationBox'>
          <h3>Recent Complains</h3>


          <div className='reports'>


            {itemsToRenderCourse.map((report, index) =>

              <div key={index} className="report" >
                <h5>{report.title}</h5>

                <p>{`${report.description.substring(0, 100)}...`}</p>

                <button onClick={() => {
                  pageStateF('Inbox')
                }} className='btn'>See Inbox</button>

              </div>

            )}




          </div>



        </div></>












    </div >
  )
}

export default Dashboard