const Menu = ({ setSort, sort, setRefresh }) => {

    const sortHandler = (sort) => {

        setRefresh(true)
        setSort(sort)
        setTimeout(() => {
            setRefresh(false)
        },1000)
    }



    const newHighlight = { background: sort === 'new' ? '#CCCCCC' : '' }
    const topHighlight = { background: sort === 'top' ? '#CCCCCC' : '' }
    const controversial = { background: sort === 'controversial' ? '#CCCCCC' : '' }

    return ( 
        <div className="sortMenu">
            <span onClick={() => sortHandler('new')} style={newHighlight}>
                <img src="/new.svg" alt="" />
                New
            </span>
            <span onClick={() => sortHandler('top')} style={topHighlight}>
            <img src="/top.svg" alt="" />
                Top
            </span>
            <span onClick={() => sortHandler('controversial')} style={controversial}>
                <img src="/trendDown.svg" alt="" />
                Controversial
            </span>
        </div>
     )
}
 
export default Menu