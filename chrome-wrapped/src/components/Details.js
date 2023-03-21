import { useState } from 'react'
import RingChart from '../charts/TimeAccessed'

const Overview = () => {
    const [day, setDay] = useState('SUN')
    return (
        <div>
            <div className='tabDetailedDays'>
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