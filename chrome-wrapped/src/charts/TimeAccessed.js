import {useEffect, useState } from 'react'
import Chart from "chart.js/auto"
import { Doughnut } from "react-chartjs-2"
import history from '../history'

const RingChart = ({NUM_SITES, TIMEFRAME}) => {
    const [chromeData, setChromeData] = useState([])

    useEffect(() => {
        // history.topVisits(NUM_SITES)
        //     .then(response => {
        //         setChromeData(response)
        //     })
    }, [])
    
    if (!chromeData || chromeData.length < 1) {
        console.log('Chrome data not loaded, returning null')
        return (<div></div>)
    }

    const labels = chromeData.map(h =>  h.title)
    const visitCounts = chromeData.map(h => h.visitCount)
    const datasets = [{
        label: 'Top 5 Site Visits',
        data: visitCounts,
        backgroundColor: [
            'rgb(42, 26, 216)',
            'rgb(78, 38, 226)',
            'rgb(114, 49, 236)',
            'rgb(149, 61, 245)',
            'rgb(185, 72, 255)'
        ],
        hoverOffset: 4
    }]
    
    const data = {
        labels: labels,
        datasets: datasets
      }
    return (<Doughnut data={ data }/>)
}

export default RingChart
