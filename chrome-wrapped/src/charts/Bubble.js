import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2"

const BubbleChart = () => {
const options = {
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Bar Chart - Stacked'
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true
    }
  }
}
const labels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
const data = {
    labels: labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        backgroundColor: 'rgb(255, 99, 99)',
      },
      {
        label: 'Dataset 2',
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        backgroundColor: 'rgb(99, 99, 255)',
      },
      {
        label: 'Dataset 3',
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        backgroundColor: 'rgb(99, 255, 99)',
      },
    ]
}
return <Bar data={data} options={options}/>
}

export default BubbleChart