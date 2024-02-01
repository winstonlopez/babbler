import Login from '../components/Login'

const Banner = ({ setUser, user, login }) => {

    

    const handleLogout = () => {
        window.localStorage.removeItem('loggedNoteappUser')
        setUser(null)
    }


    return (
        <div className="header">
            <img src="./images/roboskull.png" alt="logo" id="logo"/>
            {user ? <button onClick={ handleLogout }>Log out</button> : <Login login={ login }/>}
        </div>
     )
}
 
export default Banner