const Notes = ({ note, toggleImportance, handleDelete }) => {

    const loggedUser = JSON.parse(window.localStorage.getItem('loggedNoteappUser'))
    const user = loggedUser ? loggedUser.name : 'anonymous'
    const label = !note.important ? <img src="./unlike.svg"></img> : <img src='./heart.svg'></img>
    
    // console.log(note.user)
    return (
        <div className={'list-child'}>
            <div className="listBanner">
                <span className="userProfile">
                <span className="profilePicture"><img src='/images/user-circle.png' alt="" /></span>
                <span className="profileName">{ note.user.name ||  user}</span>
                </span>
            </div>

            <div className="listContent">
            {note.content}
            </div>

            <div className="listFooter">
            <button className="note-important-btn" onClick={toggleImportance}>{label}</button>
            {note.user.name === user && <button onClick={handleDelete} className="delete"><img src="./delete.svg"></img></button> }
            

            </div>
            
        </div>
    )
    
}
 
export default Notes