import { useState, useEffect } from 'react'
import history from '../history'
/* global chrome */

const textStyle = {
    backgroundColor: "inherit",
    margin: "auto",
    padding: "1%",
    maxWidth: "90%",
    display: "flex"
}

const Search = (props) => {

    const defaultSearch = props.query || ''

    const [filter, setFilter] = useState(defaultSearch)
    const [visits, setVisits] = useState(0)
    const [recentVisits, setRecentVisits] = useState([])
    const [searchType, setSearchType] = useState("Recent")
    // const currentSearchType = searchType

    useEffect(() => {
        //Get the data from the API
        history.searchAggregate(filter)
            .then(response => {
                setVisits(response)
            })
        if (searchType === 'Recent') {
            history.searchRecent(filter)
            .then(response => {
                setRecentVisits(response.map(v => {
                    return (
                        {...v, lastVisitTime: new Date(v.lastVisitTime).toLocaleString()}
                    )
                }))
            })
        }
        if (searchType === 'Top') {
            history.searchTopVisits(filter)
            .then(response => {
                setRecentVisits(response.map(v => {
                    return (
                        {...v, lastVisitTime: new Date(v.lastVisitTime).toLocaleString()}
                    )
                }))
            })
        }
    }, [filter, searchType])

    return (
        <div>
            <SearchBox filter={filter} setFilter={setFilter}/>
            <div style={textStyle}>Total Visit Count: {visits}</div>
            <span style={textStyle} className="siteSearch" >
                <button name="Recent" class={searchType==='Recent' ? 'selected' : ''} onClick={() => setSearchType('Recent')}>Recent</button>
                <button name="Top" class={searchType==='Top' ? 'selected' : ''} onClick={() => setSearchType('Top')}>Top Visits</button>
            </span>
            <RecentVisitList recentVisits={recentVisits} textStyle={textStyle} searchType={searchType}/>
        </div>
    )
}

const SearchBox = ({filter, setFilter}) => {
    const handleFilterChange = event => {
        console.log(event.target.value)
        setFilter(event.target.value)
    }
    return <h3 style={textStyle}>Search: <input value={filter} onChange={handleFilterChange}/></h3>
}

const openLink = (url) => {
    chrome.tabs.create({
        url: url,
        active: false
      })
}

const RecentVisitList = ({recentVisits, textStyle, searchType}) => {
    if (recentVisits.length === 0 || !recentVisits) return null
    console.log(recentVisits)
    return (
        <p>
            {recentVisits.map(v => {
                return (
                    <>
                        <div className="container">
                            <img src={`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${v.url}&size=24`} target='_blank'/>
                            <h2 style={textStyle} onClick={() => openLink(v.url)}>
                                {v.title}
                            </h2>

                            Time Accessed: {v.lastVisitTime}
                            {(searchType === 'Top' && (<div>Visit Count: {v.visitCount}</div>))}

                        </div>
                    </>
                )
            })}
        </p>
    )
}

export default Search