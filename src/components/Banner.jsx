
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { useState } from 'react'

const Banner = ({ setUser, user, setLoginPage, menuOut, setMenuOut }) => {

    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display : menuOut ? '' : 'none' }
    const menuPressed = { backgroundColor: menuOut ? '#3498DB' : '' }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedNoteappUser')
        setUser(null)
    }

    const handleLogin = () => {
        console.log('logging in')
        setLoginPage(true)
    }



    return (
        <div className="header">
            
                    <div className="menuButtons">

                        <Link to='/'><img src="./images/roboskull.png" alt="logo" id="logo"/></Link>
                        {user ? <Link to='/post' className="createNew">Create</Link> : null}
                        {user
                             ? <span className="user-area"  onClick={() => setMenuOut(!menuOut)} style={menuPressed}>
                                <p>{user.name}</p><img src="/images/user-circle.png" alt="user" />
                                <div className="userMenu" style={hideWhenVisible}>
                                    <p onClick={handleLogout}>Logout</p>
                                </div>
                                </span>
                             : <Link to='/login'>Login</Link>}
                    </div>

            
        </div>
     )
}
 
export default Banner