import { useState } from 'react'

const Details = (props) => {

    const defaultSearch = props.search || ''

    const textStyle = {
        backgroundColor: "inherit",
        margin: "auto",
        padding: "1%",
        maxWidth: "90%",
        display: "flex"
    }

    const [filter, setFilter] = useState(defaultSearch)

    useEffect(() => {
        //Get the data from the API
    }, [filter])

    return (
        <div>
            <SearchBox filter={filter} setFilter={setFilter}/>
            <h3 style={textStyle}>Visit Count: </h3>
            <h3 style={textStyle}>Last Time Visited: </h3>
            <h3 style={textStyle}>Most Recent URLs: </h3>
        </div>
    )
}

const SearchBox = ({filter, setFilter}) => {
    const handleFilterChange = event => {
        console.log(event.target.value)
        setFilter(event.target.value)
    }
    return <p>URL contains: <input value={filter} onChange={handleFilterChange}/></p>
}

export default Details