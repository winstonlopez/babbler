import { useState, useEffect, useRef } from 'react'
import Banner from './components/Banner'
import Create from './components/Create'
import ErrorMessage from './components/ErrorMessage'
import Login from './components/Login'
import Notes from './components/Notes'
import noteService from './services/notes'
import loginService from './services/login'
import Togglable from './components/Togglable'
import register from './services/register'

import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Register from './components/Register'

function App() {

  const [notes, setNotes] = useState(null)
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [loginPage, setLoginPage] = useState(false)
  const [menuOut, setMenuOut] = useState(false)

  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['notes'],
    queryFn: noteService.getAll
  })

  // console.log(JSON.parse(JSON.stringify(result)))
  let { data, status } = result
  console.log(status)

  
  //---We will use qetQuery instead to ensure data is upto date in the server
  //------------Under Replacement----------------------
  // useEffect(() => {

  //   noteService
  //       .getAll()
  //       .then(initialNotes => setNotes(initialNotes))
  // }, [])
  //---------------------------------------------------

  useEffect(() => {
    //check if previosly logged on
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

  const ToggleImportanceMutation = useMutation({
    mutationFn: noteService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      console.log('query key invalidated')
    }
  })


  const toggleImportance = (id) => {
        
        //Find the note that needs to be changed
        const note = data.find(n => n.id === id)
        //create a deep copy of the note object, using spread syntax, change the importance
        const changedNote = { ...note, important: !note.important }
      //--------------under change----------------------
        // noteService
        //   .update(id, changedNote)
        //   .then(data => setNotes(notes.map(note => note.id !== id ? note : data)))
        //   .catch(err => {
        //     setErrorMessage('Some Error Happened', err)
        //     setTimeout(() => setErrorMessage(null), 3000)
        //   })
      //---------------------------------------------------
      ToggleImportanceMutation.mutate({ id, changedNote })
  }

  const addNoteMutation = useMutation({
    mutationFn: noteService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey:['notes'] })
    }
  })

  const addNote = (noteObject) => {  //function for adding notes to the db
    
    //------------------changing to useQuery
    // noteService
    //   .create(noteObject)
    //   .then(data => {
    //     setNotes([...notes, data])
    //   })
    //   .catch(error => {
    //     console.log(error)
    //     window.localStorage.clear()
    //     setUser(null)
    //   })
    //------------------------------------------

    const content = noteObject
    addNoteMutation.mutate({ content })

  }

  const deleteMutation = useMutation({
    mutationFn: noteService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    }
  })

  const handleDelete = (id) => {

    //----------migrating to react query----------
    // const del = () => {
    //     return (
    //       noteService.remove(id)
    //            .then((response) => {
    //               console.log(response)
    //               let cutNotes = notes.filter(n => response.data.id !== n.id)
    //               setNotes(cutNotes)
    //            })
    //            .catch(err => {
    //               setErrorMessage('Some Error Happened')
    //               setTimeout(() => {
    //                 setErrorMessage(null)
    //               },3000)
    //            })
    //     )
    // }
    //--------------------------------------

    const del = () => {
      deleteMutation.mutate({ id })
    }

    window.confirm('Delete Note?') ? del() : null
    
  }

  const handleMenu = (event) => {
    console.log(event.target)
  }

  if(loginPage){
    return <Login login={login} />
  }

  return (
      <Router>
        
        <ErrorMessage message={errorMessage} />

{/*         
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
            data ? data.map(note => <Notes key={ note.id } note={ note } showAll={showAll} toggleImportance={() => toggleImportance(note.id)} handleDelete={() => handleDelete(note.id)} setUser = { setUser }/>) : <h3>Loading...</h3>
          }
          </div> */}
          
          <Routes>
            <Route path='/login' element={<Login login={login}/>}/>
            <Route path='/post' element={
              <div className='main' onClick={handleMenu}>
                <Banner setUser={ setUser } user={ user } login={ login } setLoginPage={setLoginPage}/>
                <Create addNote={addNote}/>
              </div>
              } />
            <Route path='/register' element={<Register register={register}/>} />
            <Route path='/' element={
              <div className='main'>
                <Banner setUser={ setUser } user={ user } login={ login } setLoginPage={setLoginPage} menuOut={menuOut} setMenuOut={setMenuOut}/>
                <div className="content-container">
                {data ? data.map(note => <Notes key={ note.id } note={ note } showAll={showAll} toggleImportance={() => toggleImportance(note.id)} handleDelete={() => handleDelete(note.id)} setUser = { setUser }/>) : <h3>Loading...</h3>}
                </div>
              </div>
              } />
          </Routes>
          
      
      </Router>
  )
}

export default App
