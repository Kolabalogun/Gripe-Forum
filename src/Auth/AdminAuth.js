import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../Backend/Components/Navbar';
import { useGlobalContext } from '../Functions/Context';
import { auth, db } from '../Utils/Firebase';


const initialState = {
    firstName: "",
    lastName: "",

    email: "",
    password: "",
    confirmPassword: "",
};

const AdminAuth = () => {

    const { navigate, setloader, notificationF, notification, setadminuser } = useGlobalContext()



    const [dateId, setdateId] = useState("");

    // to set timeId
    useEffect(() => {
        const dateId = new Date().getTime();
        setdateId(dateId);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [state, setstate] = useState(initialState);
    const [signUp, setsignUp] = useState(false);

    const { firstName, lastName, email, password, confirmPassword } = state;

    function handleChange(e) {
        setstate({ ...state, [e.target.name]: e.target.value });
    }

    const handleAuth = async (e) => {
        e.preventDefault();

        if (!signUp) {

            if (email && password) {
                // handleLogout()
                setloader(true);
                signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        const user = userCredential.user;

                        // Add user to firestore 
                        try {
                            addDoc(collection(db, "signedInUsers"), {
                                email: email,
                                password: password,
                                timestamp: serverTimestamp(),
                                author: user.displayName,

                                dateId: dateId,

                            });
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
            } else {
                return toast.error("All fields must be filled");
            }
        } else {
            if (password !== confirmPassword) {
                return toast.error("Password don't match");
            }
            if (firstName && email && password) {
                setloader(true);
                const { user } = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                await updateProfile(user, { displayName: `${firstName} ${lastName}` });
                navigate("/admin");
                setloader(false);
                return toast("You've successfully Signed Up");
            } else {
                return toast.error("All fields must be filled");
            }
        }
    };
    return (<>
        <Navbar />

        <div className="authBody">
            <div className="authform">
                <form onSubmit={handleAuth}>
                    <div className="authTitle">
                        <h3>{!signUp ? "Sign In" : "Sign Up"}</h3>
                    </div>

                    {signUp && (
                        <>
                            <input
                                type="text"
                                onChange={handleChange}
                                value={firstName}
                                required
                                minLength={4}
                                placeholder="FirstName"
                                name="firstName"
                            />
                            <input
                                type="text"
                                onChange={handleChange}
                                value={lastName}
                                minLength={4}
                                placeholder="LastName"
                                name="lastName"
                            />
                        </>
                    )}

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
                    {signUp && (
                        <>
                            <input
                                type="password"
                                onChange={handleChange}
                                value={confirmPassword}
                                required
                                minLength={4}
                                placeholder="Confirm Password"
                                name="confirmPassword"
                            />
                        </>
                    )}

                    <p style={{ color: "red", textAlign: "center" }}>
                        {notification}
                    </p>

                    <button>{!signUp ? "Sign In" : "Sign Up"}</button>
                </form>

                {/* <div className="dhac">
        {!signUp ? (
          <h6>
            Don't have an account?{" "}
            <span onClick={() => setsignUp(true)}>Sign Up</span>
          </h6>
        ) : (
          <h6>
            Already have an account?{" "}
            <span onClick={() => setsignUp(false)}>Sign In</span>
          </h6>
        )}
      </div> */}
            </div>
        </div>

    </>
    )
}

export default AdminAuth