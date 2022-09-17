import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Footer from '../../Frontend/Components/Footer';
import { useGlobalContext } from '../../Functions/Context';
import { db } from '../../Utils/Firebase';
import Loader from '../Components/Loader';
import Details from './Details';
import ResponseDetails from './ResponseDetails';

const Outbox = () => {

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
        loader ? <Loader /> : <>
          <div style={{ minHeight: '70vh' }}>     <div className='topauthnav'>
            <h1>Outbox</h1>


          </div>

            {
              DetailsPage ? <ResponseDetails /> :

                <>


                  <div style={{ backgroundColor: 'transparent' }} className='notificationBox'>
                    {complains.length > 0 && <h3>These are list of responses</h3>}


                    <div className='reports'>

                      {
                        complains.length > 0 ?
                          <>
                            {complains.map((report, index) => {
                              if (report.reply.replyTxt !== '') {
                                return (
                                  <div key={index} className="report" >
                                    <h5>Response From Admin</h5>

                                    <p>{`${report.reply.replyTxt.substring(0, 100)}...`}</p>
                                    <Link to={`/admin/detail/${report.id}`}>
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