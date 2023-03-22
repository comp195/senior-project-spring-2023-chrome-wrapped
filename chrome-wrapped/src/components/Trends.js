import { useState } from 'react'
import BarChart from '../charts/TimeAccessed'

const Trends = () => {
    const [currentDay, setDay] = useState('SUN')
    const tabDay = currentDay
    
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
                <button name="SUN" class={tabDay==='SUN' ? 'selected' : ''} onClick={() => setDay('SUN')}>SUN</button>
                <button name="MON" class={tabDay==='MON' ? 'selected' : ''} onClick={() => setDay('MON')}>MON</button>
                <button name="TUE" class={tabDay==='TUE' ? 'selected' : ''} onClick={() => setDay('TUE')}>TUE</button>
                <button name="WED" class={tabDay==='WED' ? 'selected' : ''} onClick={() => setDay('WED')}>WED</button>
                <button name="THR" class={tabDay==='THR' ? 'selected' : ''} onClick={() => setDay('THR')}>THR</button>
                <button name="FRI" class={tabDay==='FRI' ? 'selected' : ''} onClick={() => setDay('FRI')}>FRI</button>
                <button name="SAT" class={tabDay==='SAT' ? 'selected' : ''} onClick={() => setDay('SAT')}>SAT</button>
            </div>
            <BarChart/>
        </div>
    )
}

export default Trends