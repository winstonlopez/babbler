import { useState } from 'react'
import PropTypes from 'prop-types'

const Login = ({ login }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (event) => {
        event.preventDefault()

        login(username, password)
        
        setUsername('')
        setPassword('')
    }

    return ( 
        <div className="login">
            <form onSubmit={handleLogin}>
                <h1>Welcome to AnonDroid Blogs</h1>
                <div className='input-box'>
                    <input 
                        type="text"
                        id="name"
                        value={username}
                        name="Username"
                        placeholder="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                    <i className='bx bxs-user'></i>
                </div>
                <div className='input-box'>
                        <input 
                            type="password"
                            id="password"
                            value={password}
                            name="Password"
                            placeholder="password"
                            onChange={({ target }) => setPassword(target.value)} 
                        />
                        <i className='bx bxs-lock-alt' ></i>
                </div>
                <div className="remember-forgot">
                    <label htmlFor="remember">
                        <input type="checkbox" name="checkbox" id="remember" />Remember me
                    </label>
                    <a href="#">Forgot Password</a>
                </div>
                <div>
                    <button type="submit">login</button>
                </div>

                <div className="register-link">
                    <p>Don't have an account? <a href="#">Register</a></p>
                </div>
            </form>
        </div>
     )
}

Login.propTypes = {
    login: PropTypes.func.isRequired
}
 
export default Login