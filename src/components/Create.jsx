import { useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}

const Create = ({ addNote }) => {

    const navigate = useNavigate()

    const noteField = useField('text')

    const [newNote, setNewNote] = useState('')

    // const user = JSON.parse(window.localStorage.getItem('loggedNoteappUser')).name

    const handleCreate = (event) => {
        event.preventDefault()  
        
        addNote({   //located at App.jsx
            content: noteField.value,
            important: true
        })
        .then(data => {
            setNewNote('')
            navigate('/')
        })
        .catch(error => {
            if(error.response.data.error === 'Token Expired'){
                alert('session expired')
                navigate('/login')
                
            }
        })
        

       


    }
    

    return ( 

            <form onSubmit={handleCreate} className="create">

                <div className='inputField'>
                <textarea id="note" {...noteField} placeholder='what is on your mind?' required/>
                <button type="submit">Submit</button>
                </div>
            </form>
     )
}

Create.proptypes = {
    addNote: PropTypes.func.isRequired,
  
}
 
export default Create