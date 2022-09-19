import React from 'react'
import Navbar from '../../Backend/Components/Navbar'
import { useGlobalContext } from '../../Functions/Context'
import Sidebar from '../Components/Sidebar'
import Complain from './Screens/Complain'
import Dashboard from './Screens/Dashboard'
import Inbox from './Screens/Inbox'
import Outbox from './Screens/Outbox'
import Trash from './Screens/Trash'


const Home = () => {
    const { pageState } = useGlobalContext()
    return (
        <div className='home'>
            <Navbar />

            <div className='main'>
                <Sidebar />


                {pageState === 'complain' ? <Complain /> :

                    pageState === 'Inbox' ? <Inbox /> :
                        pageState === 'Outbox' ? <Outbox /> :
                            pageState === 'Trash' ? <Trash /> :


                                <Dashboard />}

            </div>

        </div>
    )
}

export default Home