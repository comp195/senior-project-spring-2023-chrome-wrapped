import { useState } from 'react'
import BarChart from '../charts/TimeAccessed'

const Trends = () => {
    const [currentDay, setDay] = useState('SUN')
    
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
                <button name="SUN" class={currentDay==='SUN' ? 'selected' : ''} onClick={() => setDay('SUN')}>SUN</button>
                <button name="MON" class={currentDay==='MON' ? 'selected' : ''} onClick={() => setDay('MON')}>MON</button>
                <button name="TUE" class={currentDay==='TUE' ? 'selected' : ''} onClick={() => setDay('TUE')}>TUE</button>
                <button name="WED" class={currentDay==='WED' ? 'selected' : ''} onClick={() => setDay('WED')}>WED</button>
                <button name="THR" class={currentDay==='THR' ? 'selected' : ''} onClick={() => setDay('THR')}>THR</button>
                <button name="FRI" class={currentDay==='FRI' ? 'selected' : ''} onClick={() => setDay('FRI')}>FRI</button>
                <button name="SAT" class={currentDay==='SAT' ? 'selected' : ''} onClick={() => setDay('SAT')}>SAT</button>
            </div>
            <BarChart/>
        </div>
    )
}

export default Trends