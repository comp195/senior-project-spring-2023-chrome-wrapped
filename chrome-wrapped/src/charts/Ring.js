import {useEffect, useState } from 'react'
import Chart from "chart.js/auto"
import { Doughnut } from "react-chartjs-2"
import history from '../history'

const RingChart = ({NUM_SITES, TIMEFRAME, searchQuery}) => {
    const [chromeData, setChromeData] = useState([])
    useEffect(() => {
        history.topVisits(NUM_SITES, TIMEFRAME)
            .then(response => {
                setChromeData(response)
            })
            history.getActiveTimes(0)
    }, [NUM_SITES, TIMEFRAME])
    if (!chromeData || chromeData.length < 1) {
        //Chrome Data not loaded, returned null
        //Note: because of how promises work, the graph is first loaded 
        //without data and then rerenders once a promise from the chrome API is fufilled
        return (<div></div>)
    }


    const labels = chromeData.map(h => h.url)

    const visitCounts = chromeData.map(h => h.visitCount)
    const datasets = [{
        label: 'Visit Count',
        data: visitCounts,
        backgroundColor: [
            '#2aa8f2',
            '#007bff',
            '#672af2',
            '#8e2ece',
            '#9c3daf',
            '#9c4f96',
            '#db4d80',
            '#ff6355',
            '#ff874a',
            '#fba949',
            '#ffc642',
            '#fae442',
            '#c4dd3f',
            '#8bd448',
            '#00cbc8'
        ],
        hoverOffset: 4
    }]
    
    const data = {
        labels: labels,
        datasets: datasets
    }

    const options = {
        onClick(click, elements){
            const urlDomain = labels[elements[0].index]
            console.log(urlDomain)
            searchQuery(urlDomain)
        }
    }

    return (
        <div style={{padding:'10px'}}>
            <Doughnut data={ data } options={ options } />
        </div>
    )

}

export default RingChart
