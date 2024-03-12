import { useParams } from 'react-router-dom'
import Notes from './Notes'


const User = ({  users  }) => {


    console.log(users)
    const id = useParams().id
    // console.log(users)
    const person = users.find(u => u.id === id)

    return ( 
        <div className="userContent">
            <div className="name">
                <h2>{person.name}</h2>
            </div>
            <div className="user-notes">
                {
                person.notes.map(n => <div key={n.id}>custom contents</div>)
                }
            </div>
        </div>
     )
}
 
export default User