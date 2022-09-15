import React from 'react'
import { useGlobalContext } from '../../Functions/Context'

const Sidebar = () => {
    const { pageState, pageStateF } = useGlobalContext()
    return (
        <div className='adminSidebar normalmediaQuery'>


            <div className="menus">
                <div onClick={() => {
                    pageStateF('default')
                }} className={pageState === 'default' ? 'activemenu eachmenu' : 'eachmenu'} >
                    <img src="svg/dash.svg" alt="" />
                    <p>Dashboard</p>
                </div>
                <div onClick={() => {
                    pageStateF('complain')
                }} className={pageState === 'complain' ? 'activemenu eachmenu' : 'eachmenu'} >
                    <img src="svg/blog.svg" alt="" />
                    <p>Complain</p>
                </div>

            </div>





        </div>

    )
}

export default Sidebar