import { useState } from 'react'
import PropTypes from 'prop-types'

const Create = ({ addNote, user }) => {


    const [newNote, setNewNote] = useState('')

    const handleCreate = (event) => {
        event.preventDefault()  
        addNote({
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