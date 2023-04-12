import { useState, useEffect } from 'react'
import TimeChart from '../charts/TimeAccessed'

const Trends = () => {
    const [currentDay, setDay] = useState('0')

    useEffect(() => {
        const d = new Date()
        setDay(d.getDay().toString())
    }, [])
    
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
            <h3><center>General Activity</center></h3>
            <div style={tabRowStyle} className='tabTrendDays'>
                <button name="0" class={currentDay==='0' ? 'selected' : ''} onClick={() => setDay('0')}>SUN</button>
                <button name="1" class={currentDay==='1' ? 'selected' : ''} onClick={() => setDay('1')}>MON</button>
                <button name="2" class={currentDay==='2' ? 'selected' : ''} onClick={() => setDay('2')}>TUE</button>
                <button name="3" class={currentDay==='3' ? 'selected' : ''} onClick={() => setDay('3')}>WED</button>
                <button name="4" class={currentDay==='4' ? 'selected' : ''} onClick={() => setDay('4')}>THR</button>
                <button name="5" class={currentDay==='5' ? 'selected' : ''} onClick={() => setDay('5')}>FRI</button>
                <button name="6" class={currentDay==='6' ? 'selected' : ''} onClick={() => setDay('6')}>SAT</button>
            </div>
            <TimeChart currentDay={currentDay}/>
        </div>
    )
}

export default Trends