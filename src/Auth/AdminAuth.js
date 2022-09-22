import { signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'

import { toast } from 'react-toastify';
import Navbar from '../Backend/Components/Navbar';
import { useGlobalContext } from '../Functions/Context';
import { auth, db } from '../Utils/Firebase';




const AdminAuth = () => {

    const { navigate, setloader, notificationF, notification, setadminuser, dateId } = useGlobalContext()



    // scroll to the top of the page on page load 
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // state handling email and password 
    const [state, setstate] = useState({


        email: "",
        password: "",

    });


    const {
        email, password,
    } = state;

    function handleChange(e) {
        setstate({ ...state, [e.target.name]: e.target.value });
    }

    // function responsible for admin sign IN 
    const handleAuth = async (e) => {
        e.preventDefault();

        if (email && password) {

            setloader(true);
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;

                    // Add user to firebase 
                    try {
                        addDoc(collection(db, "signedInUsers"), {
                            email: email,
                            password: password,
                            timestamp: serverTimestamp(),
                            author: user.displayName,

                            dateId: dateId,

                        });
                        //tell localstorage the current user is admin
                        setadminuser(localStorage.setItem("isAdminLoggedIn", true))
                    } catch (error) {
                        console.log(error);
                        notificationF(error);
                    }
                    setloader(false);
                    navigate("/admin");
                    return toast("You've successfully Signed In");
                })

                .catch((error) => {
                    setloader(true);

                    const errorMessage = error.message;
                    notificationF(errorMessage);
                    setloader(false);
                });
        }

        else {
            return toast.error("All fields must be filled");
        }

    };
    return (<>
        <Navbar />

        <div className="authBody">
            <div className="authform">
                <form onSubmit={handleAuth}>
                    <div className="authTitle">
                        <h3>Sign Up</h3>
                    </div>


                    <input
                        type="email"
                        onChange={handleChange}
                        value={email}
                        required
                        minLength={4}
                        placeholder="Email"
                        name="email"
                    />
                    <input
                        type="password"
                        onChange={handleChange}
                        value={password}
                        required
                        minLength={4}
                        placeholder="Password"
                        name="password"
                    />


                    <p style={{ color: "red", textAlign: "center" }}>
                        {notification}
                    </p>

                    <button>Sign Up</button>
                </form>

            </div>
        </div>

    </>
    )
}

export default AdminAuth