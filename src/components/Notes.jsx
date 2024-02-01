const Notes = ({ note, showAll, toggleImportance, handleDelete }) => {

    const label = !note.important ? <img src="./unlike.svg"></img> : <img src='./heart.svg'></img>

    if(showAll){
    return (
        <div className={note.important ? 'list-child important' : 'list-child'}>
            {note.content}
            <button className="note-important-btn" onClick={toggleImportance}>{label}</button>
            <button onClick={handleDelete} className="delete"><img src="./delete.svg"></img></button>
        </div>
    )}else if(note.important){
        return (
            <div className={note.important ? 'list-child important' : 'list-child'}>
            {note.content}
            <button className="note-important-btn" onClick={toggleImportance}>{label}</button>
            <button onClick={ handleDelete } className="delete"><img src="./delete.svg"></img></button>
            </div>
        )
    }else return undefined
}
 
export default Notes