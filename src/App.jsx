import { useState, useEffect } from 'react'
import Create from './components/Create'
import ErrorMessage from './components/ErrorMessage'
import Notes from './components/Notes'
import Show from './components/Show'
import noteService from './services/notes'

function App() {

  const [notes, setNotes] = useState(null)
  const [showAll, setShowAll] = useState(true)
  const [newNote, setNewNote] = useState(``)
  const [important, setImportant] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)



  useEffect(()=>{
    noteService
        .getAll()
        .then(initialNotes => setNotes(initialNotes))
  }, [])

  const toggleImportance = (id)=> {
        
        //Find the note that needs to be changed
        const note = notes.find(n => n.id === id)
        //create a deep copy of the note object, using spread syntax, change the importance
        const changedNote = {...note, important: !note.important}

        noteService
          .update(id, changedNote)
          .then(data => setNotes(notes.map(note => note.id !== id ? note : data)))
          .catch(err => {
            setNotes(notes.filter(n => n.id !== id))
            setErrorMessage('Some Error Happened')
            setTimeout(()=>setErrorMessage(null), 3000)
          })
  }

  const handleCreate = (event)=> {
    event.preventDefault()
    
    const newObject ={
      content: newNote,
      important: important
    }

    
    noteService
      .create(newObject)
      .then(response => {
        console.log([response.data, ...notes])
        setNotes([response.data, ...notes])
        setNewNote('')
        document.getElementById(`note`).focus()
      })
    
  }

  const handleDelete = (id)=> {
    const del = ()=> {
        return (
          noteService.remove(id)
               .then((response)=> {
                  let cutNotes = notes.filter(n => response.data.id !== n.id)
                  setNotes(cutNotes)
               })
               .catch(err => {
                  console.log(err, `note is not on the server`)
                  setNotes(notes.filter(n => n.id !== id))
                  setErrorMessage('Some Error Happened')
                  setTimeout(()=>{
                    setErrorMessage(null)
                  },3000)
               })
        )
    }

    window.confirm('Delete Note?') ? del() : null
    
  }

  return (
    <div className='main'>
      <ErrorMessage message={errorMessage} />
      <Create setNewNote={setNewNote} handleCreate={handleCreate} newNote={newNote} setImportant={setImportant}/>
      <header>
      <h2 className='note-title'>Posts</h2>

      <Show showAll={ showAll } setShowAll={ setShowAll }/>
      </header>
      
        <div className='list-parent'>
        {
          notes ? notes.map(note => <Notes key={ note.id } note={ note } showAll={showAll} toggleImportance={()=>toggleImportance(note.id)} handleDelete={()=>handleDelete(note.id)}/>) : <h3>Loading...</h3>
        }
        </div>
      
    </div>
  )
}

export default App
