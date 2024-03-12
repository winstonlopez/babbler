import { Link, useNavigate } from 'react-router-dom'

const UserBanner = ({ author, note, handleDelete }) => {
    // console.log(note)

    const navigate = useNavigate()

    const getDate = (date) => {
        const now = new Date()
        const created = new Date(date)
        const timeElapsed = (now - created)
        const minutes = (timeElapsed/(60 * 1000)).toFixed(0)
        const hours = (timeElapsed/(60 * 60 * 1000)).toFixed(0)
        const days = (timeElapsed/(60 * 60 * 24 * 1000)).toFixed(0)
        const month = (timeElapsed/(60 * 60 * 24 * 30 * 1000)).toFixed(0)
        const year = (timeElapsed/(60 * 60 * 24 * 365 * 1000)).toFixed(0)


        if(Number(year) > 0){
            if(Number(year) === 1){
                return `${year} year ago`
            }else{
                return `${year} years ago`
            }
        }
        if(Number(month) > 0 && Number(month) < 12){
            if(Number(month) === 1){
                return `${month} month ago`
            }else{
                return `${month} months ago`
            }
        }
        if(Number(days) > 0){
            if(Number(days) === 1){
                return `${days} day ago`
            }else{
                return `${days} days ago`
            }
        }
        if(hours > 0){
            if(Number(hours) === 1){
                return `${hours} hour ago`
            }else{
                return `${hours} hours ago`
            }
        }
        if(minutes > 0){
            if(Number(minutes) <= 1){
                return `${minutes} minute ago`
            }else{
                return `${minutes} minutes ago`
            }
        }


        // if(0 < timeElapsed && timeElapsed < 60 * minutes){
        //     if((timeElapsed / minutes).toFixed(0) < 2){
        //         return (timeElapsed / minutes).toFixed(0).concat(' min ago')
        //     }
        //         return (timeElapsed / minutes).toFixed(0).concat(' mins ago')
        // }else
        // if(hours < timeElapsed && timeElapsed < (30 * days)){
        //     if((timeElapsed / days).toFixed(0) < 2){
        //         return (timeElapsed / days).toFixed(0).concat(' day ago')
        //     }
        //         return (timeElapsed / days).toFixed(0).concat(' days ago')
        // }else
        // if(days < timeElapsed && timeElapsed < 12 * month){
        //     if((timeElapsed / month).toFixed(0) < 2){
        //         return (timeElapsed / month).toFixed(0).concat(' month ago')
        //     }
        //         return (timeElapsed / month).toFixed(0).concat(' months ago')
        // }else{
        //     return date
        // }

    }
    // console.log(getDate(note.createdAt))

    const deletehandler = (id) => {
        confirm('Delete Note? ') 
            ? (
                handleDelete(id)
                .then(data => console.log(data))
                .catch(error => {
                    console.log('this triggered')
                    if(error.response.data.error === 'Token Expired'){
                        alert('session expired')
                        navigate('/login')
                    }
                })
             )
            : null
    }

    const loggedUser = JSON.parse(window.localStorage.getItem('loggedNoteappUser'))

    return ( 
        <div>
            <div className="listBanner">
                <Link to={`/user/${author.id}`}>
                <span className="userProfile">
                <span className="profilePicture"><img src='/images/user-circle.png' alt="profile picture" /></span>
                <span className="profileName">
                    <p>{author.name}</p>
                    <p className='date'>{getDate(note.createdAt)}</p>
                </span>
                </span>
                </Link>
                {loggedUser
                ? note.user.name === loggedUser.name && <button onClick={() => deletehandler(note.id)} className="delete"><img src="./delete.svg"></img></button>
                : <span></span>
                }
            </div>
        </div>
     )
}
 
export default UserBanner