import { useState } from 'react'
import RingChart from '../charts/Ring'

const Overview = () => {
    const [time, setTime] = useState('7')
    return (
        <div>
            <RingChart NUM_SITES={5} TIMEFRAME={time} />
            <div>
                <button onClick={() => setTime(1)}>1D</button>
                <button onClick={() => setTime(3)}>3D</button>
                <button onClick={() => setTime(7)}>1W</button>
                <button onClick={() => setTime(14)}>2W</button>
                <button onClick={() => setTime(30)}>1M</button>
                <button onClick={() => setTime(90)}>3M</button>
            </div>
        </div>
    )
}

export default Overview