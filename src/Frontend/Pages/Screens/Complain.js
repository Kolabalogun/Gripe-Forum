import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../../Backend/Components/Loader';
import { useGlobalContext } from '../../../Functions/Context';
import { db } from '../../../Utils/Firebase';
import TextEditor from '../../Components/Editor';
import Footer from '../../Components/Footer';



const Complain = () => {


    const { user,
        setloader,
        notification,
        notificationF, loader } = useGlobalContext()



    return (
        <div className='dashboard'>
            {loader ? <Loader />
                :

                <div className='mainbody'>
                    <div style={{ flex: 2 }}>
                        <div className='topauthnav box'>
                            <h1>Complain</h1>
                            <h3 className='insidenav'>Home  / Send Message</h3>
                        </div>


                    </div>
                    <div className='notificationBox'>


                        <div className='form'>
                            <h3 className='complainheader'>Enter your Complain/Suggestion</h3>

                            <TextEditor />

                        </div>




                    </div>



                    <Footer />
                </div>

            }






        </div>
    )
}

export default Complain