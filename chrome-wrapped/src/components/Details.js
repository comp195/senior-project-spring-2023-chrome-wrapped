import { useState } from 'react'

const Details = () => {
    const textStyle = {
        backgroundColor: "inherit",
        margin: "auto",
        padding: "1%",
        maxWidth: "90%",
        display: "flex"
    }

    return (
        <div>
            <h3 style={textStyle}>Visit Counts: </h3>
            <h3 style={textStyle}>Last Time Visited: </h3>
            <h3 style={textStyle}>Most Recent URLs: </h3>
        </div>
    )
}

export default Details