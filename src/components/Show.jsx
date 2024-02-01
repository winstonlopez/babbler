'use strict'

const Show = ({ showAll, setShowAll }) => {

    const toggleShow = !showAll ? 'Show All' : 'Show liked'
    

    const handleShow = () => setShowAll(!showAll)

    return ( 
        <button onClick={handleShow} className="show">
            {toggleShow}
        </button>
     )
}
 
export default Show