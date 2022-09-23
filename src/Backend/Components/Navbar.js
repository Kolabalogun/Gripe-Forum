import React, { useState } from 'react'
import { useGlobalContext } from '../../Functions/Context'

const Navbar = () => {
  const { handleLogout, user, complains, adminuser } = useGlobalContext()




  const [showdropdown, showdropdownF] = useState(false)

  function handledropdown() {
    showdropdownF(!showdropdown)
  }


  return (

    <header>
      <div className='logo'>
        <h1>Gripe Forum</h1>
      </div>




      <div className='userNav'>

        {user ? <>  <div className='search'>


          <div className='bar'>
            <img src='svg/list.svg' alt='' />
          </div>


          <div className='inputt'>
            <input type='text' placeholder='Search...' />
            <img src='svg/search.svg' alt='' />
          </div>



        </div>

          <div className='user'>


            <div className='bar nn'>
              <img src='svg/bell.svg' alt='' />
              <span className='notifys'>{complains.length}</span>
            </div>


            <div className='bar nn'>
              <img src='svg/chat.svg' alt='' />
            </div>



            <div className=''>

              <div className='nnc'>
                <img src='svg/user.png' alt='' />
                <span onClick={handledropdown}>E. Adams</span>
              </div>

              {showdropdown &&
                <div className='dropdown'>

                  <li className='name'>
                    <p> E. Adams</p>
                  </li>
                  <li onClick={handleLogout} className='btna'>
                    <img src='svg/boxx.svg' alt='' />
                    <p>Sign Out</p>
                  </li>
                </div>}

            </div>







          </div></> : ''}




      </div>
    </header>

  )
}

export default Navbar