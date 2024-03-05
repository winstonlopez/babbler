import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Register = ({ register }) => {

    const [username, setUserName] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [hidden, setHidden] = useState('none')

    const navigate = useNavigate()

    const disp = { display: hidden }

    const handleSubmit = (event) => {
        event.preventDefault()

        register({ username, name, password })

        setUserName('')
        setName('')
        setPassword('')
        setHidden('')
        setTimeout(() => {
            navigate('/login')
            setHidden('none')
        }, 3000)
        
    }

    return ( 
        <div className='login'>
            <form onSubmit={handleSubmit}>
            <h1>Welcome to AnonDroid Blogs</h1>
            <div className="input-box">
                <input 
                    type="text"
                    name="username"     
                    value={username}
                    placeholder='UserName'
                    onChange={({ target }) => setUserName(target.value)} />
            </div>
            <div className="input-box">
                <input 
                    type="text"
                    name="name" 
                    value={name}
                    placeholder='Name'
                    onChange={({ target }) => setName(target.value)} />

            </div>
            <div className="input-box">
                <input 
                    type="password" 
                    name="password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>


            <button type='submit'>Register</button>
            <div>
                <p>already have an account? <Link to='/login'>login</Link></p>
            </div>
            <div style={disp}>
                Account Creation Succesfull!, redirecting to login page...
            </div>

            </form>
            
        </div>
     )
}
 
export default Register