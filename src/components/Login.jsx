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
                <div>
                <label htmlFor="name">
                    username:
                        <input 
                            type="text"
                            id="name"
                            value={username}
                            name="Username"
                            placeholder="Username"
                            onChange={({ target }) => setUsername(target.value)}
                        />
                </label>
                </div>
                <div>
                <label htmlFor="password">
                    password:
                        <input 
                            type="password"
                            id="password"
                            value={password}
                            name="Password"
                            placeholder="password"
                            onChange={({ target }) => setPassword(target.value)} 
                        />
                </label>
                </div>
                <div>
                    <button type="submit">login</button>
                </div>
            </form>
        </div>
     )
}

Login.propTypes = {
    login: PropTypes.func.isRequired
}
 
export default Login