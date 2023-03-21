import { useState } from 'react'
import RingChart from '../charts/TimeAccessed'

const Overview = () => {
    const [day, setDay] = useState('SUN')
    
    const tabRowStyle = {
        backgroundColor: "inherit",
        margin: "auto",
        padding: "1%",
        maxWidth: "90%",
        display: "flex",
        flexDirection: "row"
    }
    
    return (
        <div>
            <h3><center>Popular Times Accessed</center></h3>
            <div style={tabRowStyle} className='tabDetailedDays'>
                <button onClick={() => setDay('SUN')}>SUN</button>
                <button onClick={() => setDay('MON')}>MON</button>
                <button onClick={() => setDay('TUE')}>TUE</button>
                <button onClick={() => setDay('WED')}>WED</button>
                <button onClick={() => setDay('THR')}>THR</button>
                <button onClick={() => setDay('FRI')}>FRI</button>
                <button onClick={() => setDay('SAT')}>SAT</button>
            </div>
        </div>
    )
}

export default Overview