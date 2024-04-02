import { AxiosError } from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Register = ({ register }) => {

    const [username, setUserName] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [hidden, setHidden] = useState('none')
    const [error, setError] = useState('none')

    const navigate = useNavigate()

    const disp = { display: hidden }
    const errorWarning = { display: error, color: 'crimson' }

    const handleSubmit = (event) => {
        event.preventDefault()

        register({ username, name, password })
            .then(data => {
                    console.log(data.name)
                    if(data.name === 'AxiosError'){
                        if(data.response.data.error === 'duplicate username'){
                            throw new Error('duplicate username')
                        }
                    }

                setUserName('')
                setName('')
                setPassword('')
                setHidden('')
                setTimeout(() => {
                    navigate('/login')
                    setHidden('none')
                }, 2000)

            })
            .catch(error => {
                if(error){
                    console.log(error)
                    setError('')
                }
            })


        
    }

    return ( 
        <div className='login'>
            <form onSubmit={handleSubmit}>
            <div><Link to='/'><img src='/logo.svg' className='logo' /></Link></div>
            <h3>let your fun ideas and contents be heard</h3>
            <div className="input-box">
                <input 
                    type="text"
                    name="username"     
                    value={username}
                    placeholder='UserName'
                    required
                    onChange={({ target }) => {
                        setUserName(target.value)
                        setError('none')
                        }
                    } />
                    <img src="/bx-error.svg" alt="error" className='alert-error' style={errorWarning}/>
            </div>
            <div className="input-box">
                <input 
                    type="text"
                    name="name" 
                    required
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
                    required
                />
            </div>


            <button type='submit'>Register</button>
            <div>
                <p>already have an account? <Link to='/login'>login</Link></p>
            </div>
            <div style={disp}>
                Account Creation Succesfull!, redirecting to login page...
            </div>
            <div style={errorWarning}>
                Username Already Taken..
            </div>

            </form>
            
        </div>
     )
}
 
export default Register