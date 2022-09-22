import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../Functions/Context";
import { auth, db } from "../../Utils/Firebase";
import Loader from "../Components/Loader";



const initialState = {
    firstName: "",
    lastName: "",
    category: '',
    email: "",
    password: "",
    confirmPassword: "",
};



const Settings = ({ user, handleLogout, pageType, pageTypeF }) => {
    const { loader, setloader, notification, notificationF, } =
        useGlobalContext();

    const navigate = useNavigate();


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
    const [signUp, setsignUp] = useState(true);

    const { firstName, lastName, email, password, confirmPassword, category } = state;




    function handleChange(e) {
        setstate({ ...state, [e.target.name]: e.target.value });
    }

    const handleAuth = async (e) => {
        e.preventDefault();

        if (!signUp) {
            if (email && password) {
                setloader(true);
                signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        const user = userCredential.user;

                        // Add user to firestore 
                        try {
                            addDoc(collection(db, "RegisteredUsers"), {
                                email: email,
                                password: password,
                                timestamp: serverTimestamp(),
                                author: user.displayName,

                                dateId: dateId,

                            });


                        } catch (error) {
                            console.log(error);
                            notificationF(error);
                        }
                        // console.log(user);
                        notificationF("");
                        navigate("/admin");

                        setloader(false);
                        return toast("You've successfully Signed In");
                    })

                    .catch((error) => {
                        setloader(true);
                        const errorCode = error.code;
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
            if (firstName && email && password && lastName) {
                setloader(true);
                const { user } = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                setloader(false);
                setloader(true);
                try {
                    addDoc(collection(db, "admin"), {
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        category: category,
                        password: password,
                        timestamp: serverTimestamp(),
                        author: user.displayName,

                        dateId: dateId,

                    });


                } catch (error) {
                    console.log(error);
                    notificationF(error);
                }

                navigate("/admin");
                setloader(false);
                return toast("Account Successfully Added");
            } else {
                return toast.error("All fields must be filled");
            }
        }
    };

    return (


        <div className="dashboard">


            {loader ? <Loader /> :

                <div className="authBody">
                    <div className="authform">
                        <form onSubmit={handleAuth}>
                            <div className="authTitle">
                                <h3>{!signUp ? "Sign In" : "Add Admin User"}</h3>
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

                        <div className="dhac">
                            {!signUp ? (
                                <h6>
                                    Don't have an account?{" "}
                                    <span onClick={() => setsignUp(true)}>Sign Up</span>
                                </h6>
                            ) : (
                                ''

                            )}
                        </div>
                    </div>
                </div>
            }




        </div>


    );
};

export default Settings;
