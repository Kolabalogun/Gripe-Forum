import React from 'react'
import { useGlobalContext } from '../../Functions/Context'

const Sidebar = () => {
    const { pageState, pageStateF, navigate } = useGlobalContext()
    return (
        <div className='adminSidebar normalmediaQuery'>


            <div className="menus">
                <div onClick={() => {
                    navigate('/admin')
                    pageStateF('default')

                }} className={pageState === 'default' ? 'activemenu eachmenu' : 'eachmenu'} >
                    <img src="svg/dash.svg" alt="" />
                    <p>Dashboard</p>
                </div>
                <div onClick={() => {
                    navigate('/admin')
                    pageStateF('Inbox')
                }} className={pageState === 'Inbox' ? 'activemenu eachmenu' : 'eachmenu'} >
                    <img src="svg/blog.svg" alt="" />
                    <p>Inbox</p>
                </div>
                <div onClick={() => {
                    navigate('/admin')
                    pageStateF('Outbox')
                }} className={pageState === 'Outbox' ? 'activemenu eachmenu' : 'eachmenu'} >
                    <img src="svg/bar-chart-box-line.svg" alt="" />
                    <p>Outbox</p>
                </div>

            </div>





        </div>

    )
}

export default Sidebar