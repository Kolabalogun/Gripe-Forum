import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../../Backend/Components/Loader';
import { useGlobalContext } from '../../../Functions/Context';
import { db } from '../../../Utils/Firebase';
import Footer from '../../Components/Footer';



const Complain = () => {


    const { user,
        setloader,
        notification,
        notificationF, loader } = useGlobalContext()


    const [dateId, setdateId] = useState("");

    // to set timeId
    useEffect(() => {
        const dateId = new Date().getTime();
        setdateId(dateId);
    }, []);

    const [form, setform] = useState({
        title: "",
        description: "",
        reply: {

            replyTxt: "",

            dateId: '',
        }
    });


    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };



    const { title, description } = form;




    const handleSubmit = async (e) => {
        e.preventDefault();


        if (title && description) {
            // if we adding new blog
            setloader(true);
            try {
                await addDoc(collection(db, "complains"), {
                    ...form,
                    timestamp: serverTimestamp(),
                    // author: user.displayName,
                    userId: user.uid,

                    dateId: dateId,

                });
                setloader(false);
                setform({ title: '', description: '' });
                toast.success("Complaint Sent");
            } catch (error) {
                console.log(error);
                notificationF(error);
            }
        } else {
            return toast.error("All fields must be filled");
        }
        // navigate("/");
    };

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
                            <input type="text"
                                onChange={handleChange}
                                value={title}
                                required
                                minLength={3}

                                name="title" placeholder='Title of Complain' />
                            <textarea type="text"
                                onChange={handleChange}
                                value={description}
                                required
                                rows={11}
                                minLength={4}

                                name="description" placeholder='This is Where you enter all your complains' />

                            <p>{notification}</p>
                            <button onClick={handleSubmit}>Submit Complain</button>
                        </div>


                    </div>
                    <Footer />
                </div>

            }






        </div>
    )
}

export default Complain