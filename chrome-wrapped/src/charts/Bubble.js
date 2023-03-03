import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2"

const BubbleChart = () => {
const options = {
    indexAxis: 'y',
    scales: {
        y: {
          stacked: true
        },
        x: {
          reverse: true,
          max: 110,
          min: 93,
        }
      },
      interaction: {
        mode: 'x',
      }
}
const input = [93.1, 93.4, 93.7, 95.7, 98.2, 103, 105.3, 106.1, 108.2]
const datasets = input.map(n => ({
    data: [[n-0.03, n+0.03]],
    backgroundColor: 'rgb(255, 99, 132)'
}))
const data = {
    labels: [''],
    datasets: datasets
}
return <Bar data={data} options={options}/>
}

export default BubbleChart