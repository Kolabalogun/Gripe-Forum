import { signInWithPopup, signOut } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db, provider } from "../Utils/Firebase";


const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // to navigate within app
  const navigate = useNavigate();

  // for user login confirmation
  const [user, setuser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setuser(authUser);

      } else {
        setuser(null);
        navigate('/auth')
      }
    });
  }, []);

  //   logging out user
  const handleLogout = () => {
    signOut(auth).then(() => {
      setuser(null);
      navigate("/");
      signUserOut();

      // return toast.error("You've successfully Log Out");
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




  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();

    });
  };

  // Admin Page STate 

  const [pageState, pageStateF] = useState('default')



  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isLoggedIn", true);



      // Add user to firestore 
      try {
        addDoc(collection(db, "signedInUsers"), {
          email: result.user.email,
          username: result.user.displayName,
          timestamp: serverTimestamp(),
          photo: result.user.photoURL,



        });


      } catch (error) {
        console.log(error);
        notificationF(error);
      }

      // window.location.reload();
    });
  };







  return (
    <AppContext.Provider
      value={{
        user,
        setuser,
        handleLogout,

        navigate,
        loader,
        setloader,

        id,
        notification,
        notificationF,
        pageState, pageStateF,
        signInWithGoogle

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
