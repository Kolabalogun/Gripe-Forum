import React from 'react'
import { useGlobalContext } from '../../Functions/Context'

const Navbar = () => {
  const { handleLogout, adminuser, user } = useGlobalContext()
  return (

    <header>
      <div className='logo'>
        <h1>Gripe Forum</h1>
      </div>




      <div className='userNav'>
        <div className='adminNotify normal' style={{ paddingRight: 30 }}>
          {adminuser === null || adminuser === 'null' ? '' : adminuser !== null ? 'Admin' : ''}
        </div>

        {user ?
          <div onClick={handleLogout} className="eng">
            <img src="svg/enter.png" alt="" />
            <p>Log Out</p>
          </div> :
          <div className="eng">
            <img src="svg/enter.png" alt="" />
            <p style={{ color: 'black' }}>Login</p>
          </div>

        }
      </div>
    </header>

  )
}

export default Navbar