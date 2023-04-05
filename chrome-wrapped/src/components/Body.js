import { useState } from 'react'
import Overview from './Overview'
import Details from './Details'
import Trends from './Trends'

const Body = ({ currentTab, setCurrentTab }) => {
    const [query, setQuery] = useState('')

    const detailsQuery = (query) => {
        setQuery(query) //set the url from the ring chart
        console.log(query)
        setCurrentTab('Details')
    }
    

    let renderText = 'text'
    const defaultRenderStyle = {
        margin: 10,
        padding: 100,
        textAlign: "center",
        verticalAlign: "center",
        border: 3
    }
    let renderStyle = null
    console.log(currentTab)
    switch (currentTab) {
        case'Overview':
            return (<Overview detailsQuery={detailsQuery}/>)
            break
        case'Details':
            return (<Details query={query}/>)
            break
        case'Trends':
            return (<Trends/>)
            break
        case'Options':
            renderStyle = {...defaultRenderStyle, backgroundColor: "yellow"}
            renderText = 'Options'
            break
        default:
            renderStyle = {...defaultRenderStyle, backgroundColor: "red"}
            renderText = 'Error!'
    }
    const toRender = (
        <div style={renderStyle}>
            {renderText}
        </div>
    )
    return toRender
}

export default Body