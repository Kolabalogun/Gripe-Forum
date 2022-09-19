import { signInWithPopup, signOut } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db, provider } from "../Utils/Firebase";


const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // to navigate within app
  const navigate = useNavigate();

  // for user login confirmation
  const [user, setuser] = useState(localStorage.getItem("isLoggedIn"));
  const [userloggedIN, setuserloggedIN] = useState(null);
  const [adminuser, setadminuser] = useState(localStorage.getItem("isAdminLoggedIn"));

  //user ID

  const userId = user?.uid


  // console.log(user);

  // console.log(adminuser);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {


        setuser(authUser);

      } else {
        setuser(null);
        navigate('/')
      }
    });
  }, []);

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {

      localStorage.setItem("isLoggedIn", true);
      navigate('/home')

      // Add user to firestore 
      try {
        addDoc(collection(db, "signedInUsers"), {
          email: result.user.email,
          username: result.user.displayName,
          timestamp: serverTimestamp(),
          photo: result.user.photoURL,
        });
        toast(" You've successfully Signed In")
        navigate('/home')
      } catch (error) {
        console.log(error);
        notificationF(error);
      }
    });
  };

  //   logging out user
  const handleLogout = () => {
    signOut(auth).then(() => {


      setuser(null);
      localStorage.setItem("isLoggedIn", null);
      localStorage.setItem("isAdminLoggedIn", null);
      navigate("/");
      window.location.reload()



      return toast.error("You've successfully Log Out");
    });
  };


  //   this is for the loader

  const [loader, setloader] = useState(false);

  //   to determine the id of the page
  const { id } = useParams();

  // Error Notification
  const [notification, notificationF] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      notificationF("");
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [notification]);





  // Admin Page STate 

  const [pageState, pageStateF] = useState('default')





  // TYpe of User 







  // to delete blogs
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Complain?")) {
      try {
        setloader(true);
        await deleteDoc(doc(db, "complains", id));
        setloader(false);
        toast.error("Complain Deleted");
      } catch (error) {
        console.log(error);
      }
    }
  };





  return (
    <AppContext.Provider
      value={{
        user,
        setuser,
        adminuser, setadminuser,
        userloggedIN, setuserloggedIN,
        handleLogout,
        userId,

        navigate,
        loader,
        setloader,

        id,
        notification,
        notificationF,
        pageState, pageStateF,
        signInWithGoogle,

        handleDelete

      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
