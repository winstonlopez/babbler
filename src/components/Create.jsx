import {useState} from 'react'
const Create = ({ handleCreate, setNewNote, newNote,setImportant }) => {

    const handleChange = (event)=> {
        event.target.checked? setImportant(true) : setImportant(false)
    }

    const handleNoteChange = (event)=>{
        setNewNote(event.target.value)
    }

    return ( 
        
            <form onSubmit={handleCreate} className="create">
                <label htmlFor="note">Say Something:
                    <input type="text" id="note" value={newNote} onChange={handleNoteChange} required/>
                </label>
                <label htmlFor="important">Important
                    <input type="checkbox" name="important" id="important" onChange={ handleChange }/>
                </label>
                <button type="submit">Submit</button>
            </form>
     );
}
 
export default Create;