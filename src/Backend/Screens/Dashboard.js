import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Footer from '../../Frontend/Components/Footer';
import { useGlobalContext } from '../../Functions/Context';
import { db } from '../../Utils/Firebase';
import Loader from '../Components/Loader';


const Dashboard = () => {

  const [courses, coursesF] = useState([]);

  useEffect(() => {
    setloader(true);
    const unsub = onSnapshot(
      collection(db, "complains"),

      (snapshot) => {
        let list = [];

        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        coursesF(list);
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

  const itemsToRenderCourse = courses.slice(0, 4);



  const { pageStateF, loader, setloader } = useGlobalContext()




  return (
    <div className='dashboard'>

      {
        loader ? <Loader /> :


          <>
            <div style={{ minHeight: '70vh' }}>
              <div className='topauthnav'>
                <h1>Dashboard</h1>

              </div>

              <div style={{ backgroundColor: 'transparent' }} className='notificationBox'>
                <h3>Recent Complains</h3>


                <div className='reports'>

                  {
                    courses.length > 0 ?

                      <>
                        {itemsToRenderCourse.map((report, index) =>

                          <div key={index} className="report" >
                            <h5>{report.title}</h5>

                            <p>{`${report.description.substring(0, 100)}...`}</p>

                            <button onClick={() => {
                              pageStateF('Inbox')
                            }} className='btn'>See Inbox</button>

                          </div>

                        )}
                      </>
                      :
                      <div className='notificationBox' style={{ backgroundColor: 'rgb(246, 249, 252)', textAlign: 'center' }}>
                        <img src='img/dash.png' alt='' />

                        <p style={{ marginTop: -40 }}>Your Dashboard is empty</p>
                      </div>
                  }







                </div>



              </div>
            </div>
            <Footer />

          </>
      }
















    </div >
  )
}

export default Dashboard