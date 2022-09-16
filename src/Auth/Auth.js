import React from 'react'
import Navbar from '../Backend/Components/Navbar'
import { useGlobalContext } from '../Functions/Context'

const Auth = () => {

    const { signInWithGoogle } = useGlobalContext()
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
        </>

    )
}

export default Auth