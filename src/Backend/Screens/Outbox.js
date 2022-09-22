import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Footer from '../../Frontend/Components/Footer';
import { useGlobalContext } from '../../Functions/Context';

import Loader from '../Components/Loader';

import ResponseDetails from './ResponseDetails';

const Outbox = () => {

  const { loader, complains } = useGlobalContext()

  const { id } = useParams()



  useEffect(() => {


    id && DetailsPageF(true);

  }, [id]);

  // state responsible for switching between noraml page and details
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
              DetailsPage ? <ResponseDetails /> :

                <>


                  <div style={{ backgroundColor: 'transparent' }} className='notificationBox'>



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