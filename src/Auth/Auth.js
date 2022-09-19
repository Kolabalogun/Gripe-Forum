import React, { useEffect } from 'react'
import Navbar from '../Backend/Components/Navbar'
import Footer from '../Frontend/Components/Footer'
import { useGlobalContext } from '../Functions/Context'
import { auth } from '../Utils/Firebase'


const Auth = () => {

    const { signInWithGoogle, navigate, user, adminuser } = useGlobalContext()


    useEffect(() => {
        if (user && adminuser === 'null') {
            navigate('/home')
        } else if (user && adminuser !== 'null') {
            navigate('/admin')
        }

        else {
            navigate('/')
        }
    }, []);



    return (
        <>


            <Navbar />
            <div className='authbody'>
                <h1>Welcome to Gripe Forum</h1>
                <p>Here you can send an anonymous message to the School Adminstrator.</p>
                <p>To Continue, Sign in with your Google Account</p>

                <div onClick={signInWithGoogle} className="commmetSignIn">
                    <div className="google">
                        <img src="svg/search.png" alt="" />
                    </div>
                    <p>Continue with Google</p>
                </div>

            </div>
            <Footer />
        </>

    )
}

export default Auth