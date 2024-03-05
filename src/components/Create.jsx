import { useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
const Create = ({ addNote }) => {

    const navigate = useNavigate()

    const [newNote, setNewNote] = useState('')

    const user = JSON.parse(window.localStorage.getItem('loggedNoteappUser')).name

    const handleCreate = (event) => {
        event.preventDefault()  
        console.log(user)
        addNote({   //located at App.jsx
            content: newNote,
            important: true
        })
        
        setNewNote('')
        navigate('/')

    }
    

    return ( 

            <form onSubmit={handleCreate} className="create">
                <h2>Create New Post</h2>
                <div className='inputField'>
                <input type="text" id="note" value={newNote} onChange={event => setNewNote(event.target.value)} required/>
                </div>
                <button type="submit">Submit</button>
            </form>
     )
}

Create.proptypes = {
    addNote: PropTypes.func.isRequired,
    user: PropTypes.string.isRequired
}
 
export default Create