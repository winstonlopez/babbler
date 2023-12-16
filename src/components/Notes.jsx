const Notes = ({ note, showAll, toggleImportance, handleDelete }) => {

    const label = !note.important ? <img src="./heart.svg"></img> : <img src='./unlike.svg'></img>

    if(showAll){
    return (
        <li className={note.important ? 'list-child important' : 'list-child'}>
            {note.content}
            <button className="note-important-btn" onClick={toggleImportance}>{label}</button>
            <button onClick={handleDelete} className="delete"><img src="./delete.svg"></img></button>
        </li>
    )}else if(note.important){
        return (
            <li className={note.important ? 'list-child important' : 'list-child'}>
            {note.content}
            <button className="note-important-btn" onClick={toggleImportance}>{label}</button>
            <button onClick={ handleDelete } className="delete"><img src="./delete.svg"></img></button>
            </li>
        )
    }else return undefined
}
 
export default Notes;