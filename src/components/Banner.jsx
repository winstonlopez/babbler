
const Banner = ({ setUser, user, setLoginPage }) => {


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
            <img src="./images/roboskull.png" alt="logo" id="logo"/>
            {user ? <button onClick={ handleLogout }>Log out</button> : <span id='loginButton' onClick={handleLogin}>Login</span>}
        </div>
     )
}
 
export default Banner