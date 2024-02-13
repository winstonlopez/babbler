import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
//the function that creates the component is wrapped inside a forwardRef function call

const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })  //function calls

    return (
        <div className='createNoteForm'>
            
            <button onClick={toggleVisibility} style={hideWhenVisible} id="createButton">{props.buttonLabel}</button>
            
            <div style={showWhenVisible}>
                {props.children}
            </div>
            <button onClick={toggleVisibility} style={showWhenVisible}>cancel</button>
        </div>
    )
})

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}
Togglable.displayName = 'Togglable'
export default Togglable