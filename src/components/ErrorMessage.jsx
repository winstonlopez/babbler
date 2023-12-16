const ErrorMessage = ({ message }) => {
    if(message === null){
        return null
    }

    return (
        <div className="errorMesssage">
            { message }
        </div>
    )
}
 
export default ErrorMessage;