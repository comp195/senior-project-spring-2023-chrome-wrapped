import { useState } from 'react'
import Overview from './Overview'
import Search from './Search'
import Trends from './Trends'
import About from './About'

const Body = ({ currentTab, setCurrentTab }) => {
    const [query, setQuery] = useState('')

    const searchQuery = (query) => {
        setQuery(query) //set the url from the ring chart
        setCurrentTab('Search')
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
    switch (currentTab) {
        case'Overview':
            return (<Overview searchQuery={searchQuery}/>)
            break
        case'Search':
            return (<Search query={query}/>)
            break
        case'Trends':
            return (<Trends/>)
            break
        case'About':
            renderStyle = {...defaultRenderStyle, backgroundColor: "yellow"}
            renderText = 'Options'
            return (<About/>)
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