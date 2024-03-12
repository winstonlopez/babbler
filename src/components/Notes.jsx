import { useState } from 'react'
import { Link } from 'react-router-dom'
import UserBanner from './UserBanner'
import { useNavigate } from 'react-router-dom'

const Notes = ({ note, toggleImportance, handleDelete, users, handleDislike }) => {


    const navigate = useNavigate()
    const author = note.user

    const handleLike = () => {
        toggleImportance()
            .then(response => console.log(response))
            .catch(error => {
                if(error.response.data.error === 'Token Expired'){
                    alert('session expired')
                    navigate('/login')
                    
                }
            })
    }

    const dislikeHandler = () => {
        console.log('this handler works')
        handleDislike()
            .then(response => console.log(response))
            .catch(error => {
                if(error.response.data.error === 'Token Expired'){
                    alert('session expired')
                    navigate('/login')
                    
                }
            })
    }

 

    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const handleVisible = () => {
        setVisible(!visible)
    }
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedNoteappUser'))

    const user = loggedUser ? loggedUser.name : null
    const userId =  loggedUser ? loggedUser.userId : 'null'
    const liked = note.likes.find(item => item === userId)
    const disliked = note.dislikes.find(item => item === userId)
    const likeLabel = !liked ? <img src="./heart.png"></img> : <img src='./heart.svg'></img>
    const disLike = !disliked ? <img src='./dislike.svg'></img> : <img src='./disliked.svg' />
    let userLikes = []

    for(let i = 0; i < note.likes.length; i++){
        let name = users.find(item => item.id === note.likes[i])
        // console.log(name)
        if(name){
            userLikes = userLikes.concat(name)
        }
    }

    let userLikesDisplay = userLikes.slice(0,2)
    if(userLikes.length > 2){
        userLikesDisplay = userLikesDisplay.concat({ name: ' and others..' })
    }

    return (
        
        <div className={'list-child'}>

            <UserBanner note={note} author={author} handleDelete={handleDelete}/>
           
            <div className="listContent">
            <span className='counter'>{note.likes.length - note.dislikes.length}</span>
            {note.content}
            </div>

            <div className="listFooter">
                <div className="likes">

                    {user && <button className="note-important-btn" onClick={handleLike}>{likeLabel}</button>}
                    {user && <button className='note-important-btn' onClick={dislikeHandler}>{disLike}</button>}
                </div>
                <div>
                    <span style={hideWhenVisible} onClick={handleVisible} className='user-likes'>
                        {note.likes.length > 0
                            ? userLikes.length > 0 
                                ? <span>liked by: &nbsp;
                                    <span>
                                    {
                                        userLikesDisplay.map(u => {
                                            if(u.name === ' and others..'){
                                                return <span key={u.name}>and others</span>
                                            }else{
                                                return <span key={u.id}><Link to={`/user/${u.id}`} >{u.name}, </Link></span>
                                            }

                                        })
                                    }
                                    </span>
                                    
                                  </span> 
                                : <span></span>
                            : <span></span>}
                    </span>
                </div>
            </div>
            <div className="userlikes" style={showWhenVisible}>
                <p>liked by:</p>
                {
                    userLikes.map(u => <div key={u.id}><Link to={`/user/${u.id}`} >{u.name}</Link></div>)
                }
                <p onClick={handleVisible}>hide</p>
            </div>
        </div>
    )
    
}
 
export default Notes