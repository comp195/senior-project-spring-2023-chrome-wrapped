import { useState, useEffect } from 'react'
import history from '../history'
/* global chrome */

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
    const [visits, setVisits] = useState(0)
    const [recentVisits, setRecentVisits] = useState([])

    useEffect(() => {
        //Get the data from the API
        history.searchAggregate(filter)
            .then(response => {
                setVisits(response)
            })
        history.searchRecent(filter)
            .then(response => {
                
                // const rawDate = new Date(response.lastVisitTime)
                // const date = rawDate.toLocaleString()
                setRecentVisits(response.map(v => {
                    return (
                        {...v, lastVisitTime: new Date(v.lastVisitTime).toLocaleString()}
                    )
                }))
            })
    }, [filter])

    return (
        <div>
            <SearchBox filter={filter} setFilter={setFilter}/>
            <h3 style={textStyle}>Total Visit Count: {visits}</h3>
            <h3 style={textStyle}>Most Recent URLs: </h3>
            <RecentVisitList recentVisits={recentVisits} textStyle={textStyle}/>
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

const openLink = (url) => {
    chrome.tabs.create({
        url: url,
        active: false
      })
}

const RecentVisitList = ({recentVisits, textStyle}) => {
    if (recentVisits.length === 0 || !recentVisits) return null
    console.log(recentVisits)
    return (
        <p>
            {recentVisits.map(v => {
                return (
                    <>
                        <div>
                            <img src={`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${v.url}&size=16`} target='_blank'/>
                            <h2 style={textStyle} onClick={() => openLink(v.url)}>
                                {v.title}
                            </h2>
                        </div>
                        <div style={textStyle}>
                        Time Accessed: {v.lastVisitTime}
                        </div>
                    </>
                )
            })}
        </p>
    )
}

export default Details