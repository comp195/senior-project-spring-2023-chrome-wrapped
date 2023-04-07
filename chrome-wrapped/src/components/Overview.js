import { useState } from 'react'
import RingChart from '../charts/Ring'

const Overview = ({searchQuery}) => {
    const [time, setTime] = useState('7')
    const [numSites, setNumSites] = useState('5')
    const [currentTabTime, setCurrentTabTime] = useState('1W')
    const [currentTabSites, setCurrentTabSites] = useState('5')

    const tabTime = currentTabTime
    const tabSites = currentTabSites

    const switchTabTime = tab => {
        if (!tab) {
          return
        }
        setCurrentTabTime(tab)
    }

    const switchTabSites = tab => {
        if (!tab) {
          return
        }
        setCurrentTabSites(tab)
    }

    return (
        <div>
            
            <RingChart NUM_SITES={numSites} TIMEFRAME={time} searchQuery={searchQuery}/>
            <div className='tabTime'>
                <label>Time Frame: </label>
                
                <button name="1D" class={tabTime==='1D' ? 'selected' : ''} onClick={() => {setTime(1); switchTabTime('1D')}}>1D</button>
                <button name="3D" class={tabTime==='3D' ? 'selected' : ''} onClick={() => {setTime(3); switchTabTime('3D')}}>3D</button>
                <button name="1W" class={tabTime==='1W' ? 'selected' : ''} onClick={() => {setTime(7); switchTabTime('1W')}}>1W</button>
                <button name="2W" class={tabTime==='2W' ? 'selected' : ''} onClick={() => {setTime(14); switchTabTime('2W')}}>2W</button>
                <button name="1M" class={tabTime==='1M' ? 'selected' : ''} onClick={() => {setTime(30); switchTabTime('1M')}}>1M</button>
                <button name="3M" class={tabTime==='3M' ? 'selected' : ''} onClick={() => {setTime(90); switchTabTime('3M')}}>3M</button>
            </div>
            <div className='tabSites'>
                <label>Number of Sites: </label>

                <button name="5" class={tabSites==='5' ? 'selected' : ''} onClick={() => {setNumSites(5); switchTabSites('5')}}>5</button>
                <button name="10" class={tabSites==='10' ? 'selected' : ''} onClick={() => {setNumSites(10); switchTabSites('10')}}>10</button>
                <button name="15" class={tabSites==='15' ? 'selected' : ''} onClick={() => {setNumSites(15); switchTabSites('15')}}>15</button>
            </div>
        </div>
    )
}

export default Overview