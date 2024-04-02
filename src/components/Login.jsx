import { useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate, Link } from 'react-router-dom'

const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}

const Login = ({ login }) => {

    const navigate = useNavigate()
    const username = useField('text')
    const password = useField('password')
    // const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')

    const handleLogin = (event) => {
        event.preventDefault()

        login(username.value, password.value)
        
        // username.onChange('')
        // password.onChange('')
        navigate('/')
    }

    return ( 
        <div className="login">
            <form onSubmit={handleLogin}>
                <div><Link to='/'><img src='/logo.svg' className='logo'/></Link></div>
                <h3>let your fun ideas and contents be heard</h3>
                <div className='input-box'>
                    <input 
                        {...username}
                        id="name"
                        name="Username"
                        placeholder="Username"
                        
                    />
                    <i className='bx bxs-user'></i>
                </div>
                <div className='input-box'>
                        <input 
                            {...password}
                            id="password"
                            name="Password"
                            placeholder="password"
                             
                        />
                        <i className='bx bxs-lock-alt' ></i>
                </div>
                <div className="remember-forgot">
                    <label htmlFor="remember">
                        <input type="checkbox" name="checkbox" id="remember" />Remember me
                    </label>
                    {/* <a href="#">Forgot Password</a> */}
                </div>
                <div>
                    <button type="submit">login</button>
                </div>

                <div className="register-link">
                    <p>Don't have an account? <Link to='/register'>Register</Link></p>
                </div>
            </form>
        </div>
     )
}

Login.propTypes = {
    login: PropTypes.func.isRequired
}
 
export default Login