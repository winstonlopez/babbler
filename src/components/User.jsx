import { useParams } from 'react-router-dom'


const User = ({  users  }) => {


    console.log(users)
    const id = useParams().id
    const person = users.find(u => u.id === id)
    console.log(person)

    return ( 
        <div className='userContentContainer'>
            <div className="userContent">
                <div className="name">
                    <div className="imageContainer">
                    <img src="/userBig.svg" alt="profile" />
                    </div>
                    <h2>{person.name}</h2>
                </div>
            </div>
        </div>
     )
}
 
export default User