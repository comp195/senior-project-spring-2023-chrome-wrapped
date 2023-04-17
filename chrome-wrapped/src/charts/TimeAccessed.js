import {useEffect, useState } from 'react'
import Chart from "chart.js/auto"
import { Bar } from "react-chartjs-2"
import history from '../history'

const BarChart = ({currentDay}) => {

    const [dayData, setDayData] = useState([])

    useEffect(() => {
        history.getActiveTimes()
            .then(response => {
                console.log(response)
                console.log("0, 4 data", response[1][4])
                setDayData(response[currentDay].slice(0,24))
            })
    }, [currentDay])

    // const labels = ['3AM','6AM','9PM','12PM','3PM','6PM','9PM','12AM']
    const labels = ['1AM','2AM','3AM','4AM','5AM','6AM','7AM','8AM','9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM','6PM','7PM','8PM','9PM','10PM','11PM','12PM']

    const datasets = [{
        label: 'Active Times',
        data: dayData,
        backgroundColor: [
            'rgba(300, 99, 132, 0.2)',
            'rgba(255, 99, 100, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
            'rgb(300, 99, 132)',
            'rgb(255, 99, 100)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
        ],
        borderWidth: 1,
        barThickness: 12
    }]
    
    const data = {
        labels: labels,
        datasets: datasets
    }
    return (<Bar data={ data }/>)
}

export default BarChart
