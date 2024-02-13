import { useState, useEffect, useRef } from 'react'
import Banner from './components/Banner'
import Create from './components/Create'
import ErrorMessage from './components/ErrorMessage'
import Login from './components/Login'
import Notes from './components/Notes'
import noteService from './services/notes'
import loginService from './services/login'
import Togglable from './components/Togglable'

function App() {

  const [notes, setNotes] = useState(null)
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [loginPage, setLoginPage] = useState(false)
  const noteFormRef = useRef()


  useEffect(() => {
    //check if previosly logged on
    noteService
        .getAll()
        .then(initialNotes => setNotes(initialNotes))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')

    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const login = async (username, password) => {
    
    try {
      const user = await loginService.login({
        username, password
      })

      if(user){
        window.localStorage.setItem(
          'loggedNoteappUser', JSON.stringify(user)
        )
      }

      noteService.setToken(user.token)
      setUser(user)
      setLoginPage(false)

    } catch(exception) {
      setErrorMessage('Wrong Credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }

  }


  const toggleImportance = (id) => {
        
        //Find the note that needs to be changed
        const note = notes.find(n => n.id === id)
        //create a deep copy of the note object, using spread syntax, change the importance
        const changedNote = { ...note, important: !note.important }

        noteService
          .update(id, changedNote)
          .then(data => setNotes(notes.map(note => note.id !== id ? note : data)))
          .catch(err => {
            setErrorMessage('Some Error Happened', err)
            setTimeout(() => setErrorMessage(null), 3000)
          })
  }

  const addNote = (noteObject) => {  //function for adding notes to the db
    
    noteFormRef.current.toggleVisibility()  //use the ref

    noteService
      .create(noteObject)
      .then(data => {
        setNotes([...notes, data])
      })
      .catch(error => {
        console.log(error)
        window.localStorage.clear()
        setUser(null)
      })
    
  }

  const handleDelete = (id) => {
    const del = () => {
        return (
          noteService.remove(id)
               .then((response) => {
                  console.log(response)
                  let cutNotes = notes.filter(n => response.data.id !== n.id)
                  setNotes(cutNotes)
               })
               .catch(err => {
                  setErrorMessage('Some Error Happened')
                  setTimeout(() => {
                    setErrorMessage(null)
                  },3000)
               })
        )
    }

    window.confirm('Delete Note?') ? del() : null
    
  }
  if(loginPage){
    return <Login login={login} />
  }

  return (
    
      <div className='main'>
        <Banner setUser={ setUser } user={ user } login={ login } setLoginPage={setLoginPage}/>
        <ErrorMessage message={errorMessage} />
        {user === null 
          ? (
              <span></span>
            )
          : (
                <Togglable buttonLabel="Add New Note" ref={noteFormRef}>
                  <Create addNote={addNote} user={user.name}/>
                </Togglable>
            )
        }
        
        <div className='postTitle'>
        <h2 className='note-title'>Posts</h2>

        
        </div>
        
          <div className='list-parent'>
          {
            notes ? notes.map(note => <Notes key={ note.id } note={ note } showAll={showAll} toggleImportance={() => toggleImportance(note.id)} handleDelete={() => handleDelete(note.id)} setUser = { setUser }/>) : <h3>Loading...</h3>
          }
          </div>
        
      </div>
  )
}

export default App
