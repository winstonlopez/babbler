import { useState } from 'react'
import PropTypes from 'prop-types'

const Create = ({ addNote }) => {


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
    }
    

    return ( 

            <form onSubmit={handleCreate} className="create">
                <label htmlFor="note">{user}:
                    <input type="text" id="note" value={newNote} onChange={event => setNewNote(event.target.value)} required/>
                </label>
                <button type="submit">Submit</button>
            </form>
     )
}

Create.proptypes = {
    addNote: PropTypes.func.isRequired,
    user: PropTypes.string.isRequired
}
 
export default Create