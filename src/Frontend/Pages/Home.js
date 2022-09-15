import React from 'react'
import Navbar from '../../Backend/Components/Navbar'
import { useGlobalContext } from '../../Functions/Context'
import Sidebar from '../Components/Sidebar'
import Complain from './Screens/Complain'
import Dashboard from './Screens/Dashboard'


const Home = () => {
    const { pageState } = useGlobalContext()
    return (
        <div className='home'>
            <Navbar />

            <div className='main'>
                <Sidebar />


                {pageState === 'complain' ? <Complain /> :




                    <Dashboard />}

            </div>

        </div>
    )
}

export default Home