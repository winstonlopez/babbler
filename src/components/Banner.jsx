
import {  Link } from 'react-router-dom'


const Banner = ({ setUser, user, menuOut }) => {



    const hideWhenVisible = { display : menuOut ? '' : 'none' }
    const menuPressed = { backgroundColor: menuOut ? '#3498DB' : '' }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedNoteappUser')
        setUser(null)
    }



    return (
        <div className="header">
            
                    <div className="menuButtons">

                        <Link to='/'><img src="./images/roboskull.png" alt="logo" id="logo"/></Link>
                        
                        {user
                             ? <span className="user-area" style={menuPressed}>
                                <p>{user.name}</p><img src="/images/user-circle.png" alt="user" />
                                <div className="userMenu" style={hideWhenVisible}>
                                    {user ? <Link to='/post'><p>Create Post</p></Link> : null}
                                    {user? <Link to={`/user/${user.userId}`}><p>Profile</p></Link> : null}
                                    <p onClick={handleLogout}>Logout</p>
                                </div>
                                </span>
                             : <Link to='/login'>Login</Link>}
                    </div>

            
        </div>
     )
}
 
export default Banner