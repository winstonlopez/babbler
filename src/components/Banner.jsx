
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

                        <Link to='/'><img src="/logo.svg" alt="logo" className="logo"/></Link>
                        
                        {user
                             ? <span className="user-area" style={menuPressed}>
                                <p>{user.name}</p><img src="/userBig.svg" alt="user" />
                                <div className="userMenu" style={hideWhenVisible}>
                                    {user ? <Link to='/post'><p>Create Post</p></Link> : null}
                                    {user? <Link to={`/users/${user.userId}`}><p>Profile</p></Link> : null}
                                    <p onClick={handleLogout}>Logout</p>
                                </div>
                                </span>
                             : <span className='login-link'><Link to='/login'>login</Link>/<Link to='/register'>sign up</Link></span>
                             }
                        
                    </div>

            
        </div>
     )
}
 
export default Banner