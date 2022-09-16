import React, { useEffect } from 'react'
import { useGlobalContext } from '../Functions/Context'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import Dashboard from './Screens/Dashboard'
import Inbox from './Screens/Inbox'
import Outbox from './Screens/Outbox'


const AdminHome = () => {

    const { pageState } = useGlobalContext()




    return (

        <div className='home'>
            <Navbar />

            <div className='main'>
                <Sidebar />


                {pageState === 'Inbox' ? <Inbox /> :

                    pageState === 'Outbox' ? <Outbox /> :

                        <Dashboard />}

            </div>

        </div>
    )
}

export default AdminHome