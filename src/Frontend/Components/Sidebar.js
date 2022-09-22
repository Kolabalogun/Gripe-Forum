import React from 'react'
import { useGlobalContext } from '../../Functions/Context'

const Sidebar = () => {
    const { pageState, pageStateF, navigate } = useGlobalContext()
    return (
        <div className='adminSidebar normalmediaQuery'>


            <div className="menus">
                <div onClick={() => {
                    navigate('/home')
                    pageStateF('default')
                }} className={pageState === 'default' ? 'activemenu eachmenu' : 'eachmenu'} >
                    <img src="svg/dash.svg" alt="" />
                    <p>Dashboard</p>
                </div>
                <div onClick={() => {
                    navigate('/home')
                    pageStateF('complain')
                }} className={pageState === 'complain' ? 'activemenu eachmenu' : 'eachmenu'} >
                    <img src="svg/compose.svg" alt="" />
                    <p>Complain</p>
                </div>
                <div onClick={() => {
                    navigate('/home')
                    pageStateF('Inbox')
                }} className={pageState === 'Inbox' ? 'activemenu eachmenu' : 'eachmenu'} >
                    <img src="svg/inbox.svg" alt="" />
                    <p>Inbox</p>
                </div>
                <div onClick={() => {
                    navigate('/home')
                    pageStateF('Outbox')
                }} className={pageState === 'Outbox' ? 'activemenu eachmenu' : 'eachmenu'} >
                    <img src="svg/outbox.svg" alt="" />
                    <p>Outbox</p>
                </div>


            </div>





        </div>

    )
}

export default Sidebar