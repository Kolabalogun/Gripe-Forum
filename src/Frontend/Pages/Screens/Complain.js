import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGlobalContext } from '../../../Functions/Context';
import { db } from '../../../Utils/Firebase';



const Complain = () => {


    const { user,

        handleLogout,


        loader,
        setloader,


        notification,
        notificationF } = useGlobalContext()


    const [dateId, setdateId] = useState("");

    // to set timeId
    useEffect(() => {
        const dateId = new Date().getTime();
        setdateId(dateId);
    }, []);

    const [form, setform] = useState({
        title: "",
        description: "",
        reply: []
    });


    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };



    const { title, description, reply } = form;




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
        <div className='dashboard'>  <div className='topauthnav'>
            <h1>Complain</h1>

        </div>

            <div className='notificationBox'>
                <h3>Please Submit your Report</h3>

                <div className='form'>
                    <input type="text"
                        onChange={handleChange}
                        value={title}
                        required
                        minLength={4}

                        name="title" placeholder='Title of Complain' />
                    <textarea type="text"
                        onChange={handleChange}
                        value={description}
                        required
                        rows={9}
                        minLength={4}

                        name="description" placeholder='This is Where you enter all your complains' />

                    <p>{notification}</p>
                    <button onClick={handleSubmit}>Submit Complain</button>
                </div>


            </div></div>
    )
}

export default Complain