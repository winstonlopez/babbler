import { useState, useEffect, useRef } from 'react'
import Banner from './components/Banner'
import Create from './components/Create'
import ErrorMessage from './components/ErrorMessage'
import Login from './components/Login'
import Notes from './components/Notes'
import noteService from './services/notes'
import loginService from './services/login'

import userService from './services/register'

import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Register from './components/Register'
import User from './components/User'
import Menu from './components/Menu'

import { useReducer } from 'react'



// const sortReducer = (state, action) => {
 
//   switch (action.type) {
//     case 'new':
//       console.log('new sort')

//       return state.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
//     case 'top':
//       console.log('top sort')

//       return  state.sort((a,b) => {
//         return (b.likes.length - b.dislikes.length) - (a.likes.length - a.dislikes.length)
//       })
//     case 'controversial':
//       console.log('controversial sort')

//       return state.sort((a,b) => {
//         return (a.likes.length - a.dislikes.length) - (b.likes.length - b.dislikes.length)
//       })
//       case 'set':
//         console.log('initial data set')
//         state = action.payload
//         return state
//     default:
//       return state
//   }
// }




function App() {



  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [sessionExpired, setSessionExpired] = useState(false)
  const [menuOut, setMenuOut] = useState(false)
  const [sort, setSort] = useState('new')
  const [refresh, setRefresh] = useState(false)
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['notes'],
    queryFn: noteService.getAll,

  })

  const users = useQuery({
    queryKey: ['users'],
    queryFn: userService.getUsers,

  })


  // console.log(JSON.parse(JSON.stringify(result)))
  let { data, status } = result
  


  // const [sorted, sortDispatch] = useReducer(sortReducer, data)

  // console.log(sorted)

  // useEffect(() => {
  //   sortDispatch({
  //     type: 'set',
  //     payload: data
  //   })
  // }, [data])
  

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
      setSessionExpired(false)

    } catch(exception) {
      setErrorMessage('Wrong Credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }

  }


  const ToggleImportanceMutation = useMutation({
    mutationFn: noteService.like,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    }
  })

  const dislikeMutation = useMutation({
    mutationFn: noteService.dislike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    }
  })

  const handleDislike = (id) => {

    const note = data.find(n => n.id === id)

    return dislikeMutation.mutateAsync({ id, note })
  }
  const toggleImportance = (id) => {
        
        //Find the note that needs to be changed
        const note = data.find(n => n.id === id)
        // console.log(note, id)
        //create a deep copy of the note object, using spread syntax, change the importance
        // const changedNote = { ...note, important: !note.important }
      //--------------under change----------------------
        // noteService
        //   .update(id, changedNote)
        //   .then(data => setNotes(notes.map(note => note.id !== id ? note : data)))
        //   .catch(err => {
        //     setErrorMessage('Some Error Happened', err)
        //     setTimeout(() => setErrorMessage(null), 3000)
        //   })
      //---------------------------------------------------
      return ToggleImportanceMutation.mutateAsync({ id, note })
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
        return addNoteMutation.mutateAsync({ content })

    
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
    // console.log(id)


    return deleteMutation.mutateAsync({ id })
    
  }

  const menuHandler = (event) => {
    if(event.target.closest('span.user-area')){
      if(menuOut){//click inside

        setMenuOut(!menuOut)
      }else{

        setMenuOut(true)
      }
      }else{
        setMenuOut(false)

      }

  }
    

    if(status === 'success'){
      if(sort === 'new'){
        data.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
      }
      if(sort === 'top'){
        data.sort((a,b) => {
          return (b.likes.length - b.dislikes.length) - (a.likes.length - a.dislikes.length)
        })
      }
      if(sort === 'controversial'){
        data.sort((a,b) => {
          return (a.likes.length - a.dislikes.length) - (b.likes.length - b.dislikes.length)
        })
      }
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
              <div className='main' onClick={(event) => menuHandler(event)}>
                <Banner setUser={ setUser } user={ user } menuOut={menuOut}/>
                <Create addNote={addNote} sessionExpired={sessionExpired}/>
              </div>
              } />
            <Route path='/register' element={<Register register={userService.register}/>} />
            <Route path='/' element={
                <div className='main' onClick={(event) => menuHandler(event)}>
                    <Banner setUser={ setUser } user={ user }  menuOut={menuOut}/>
                    {data && <Menu setSort={setSort} sort={sort} data={data} setRefresh={setRefresh}/>}
                    <div className="content-container">
                    {data && users.status === 'success'? data.map(note => <Notes key={ note.id } note={ note } handleDislike={() => handleDislike(note.id)} toggleImportance={() => toggleImportance(note.id)} handleDelete={() => handleDelete(note.id)} setUser = { setUser } users={users.data} sessionExpired={sessionExpired}/>) : <h3>Loading...</h3>}
                    </div>

                </div>
              } />
              <Route path='/users/:id' element={status === 'success' && users
                ? (
                <div className='main' onClick={(event) => menuHandler(event)}>
                  <Banner setUser={ setUser } user={ user }  menuOut={menuOut} />
                  {users.status ==='success' && data ? <User user={ user } toggleImportance={toggleImportance} handleDelete={handleDelete} setUser = { setUser } users={users.data}/>: <h3>Loading</h3>}
                  <div className="content-container">
                  {data && users.status === 'success'? data.map(note => <Notes key={ note.id } note={ note } handleDislike={() => handleDislike(note.id)} toggleImportance={() => toggleImportance(note.id)} handleDelete={() => handleDelete(note.id)} setUser = { setUser } users={users.data} sessionExpired={sessionExpired}/>) : <h3>Loading...</h3>}
                    </div>
                </div>
                
                )
                : <div>Loading...</div>} />
          </Routes>
          
      
      </Router>
  )
}

export default App
