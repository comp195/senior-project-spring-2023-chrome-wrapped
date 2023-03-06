import Ring from '../charts/Ring'
import history from '../history'

const Body = ({ currentTab }) => {
    let renderText = 'text'
    const defaultRenderStyle = {
        margin: 10,
        padding: 100,
        textAlign: "center",
        verticalAlign: "center",
        border: 3
    }
    let renderStyle = null
    console.log(currentTab)
    switch (currentTab) {
        case'Overview':
        const data = {
                labels: [
                  'Red',
                  'Blue',
                  'Yellow'
                ],
                datasets: [{
                  label: 'My First Dataset',
                  data: [300, 50, 100],
                  backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                  ],
                  hoverOffset: 4
                }]
              }
            return (
                <Ring data={data}/>
            )
            //renderStyle = {...defaultRenderStyle, backgroundColor: "blue"}
            //renderText = 'Overview'
            break
        case'Details':
            console.log(history.topVisits(5));
            renderStyle = {...defaultRenderStyle, backgroundColor: "green"}
            renderText = 'Detailed View'
            break
        case'Trends':
            renderStyle = {...defaultRenderStyle, backgroundColor: "purple"}
            renderText = 'Trends'
            break
        case'Options':
            renderStyle = {...defaultRenderStyle, backgroundColor: "yellow"}
            renderText = 'Options'
            break
        default:
            renderStyle = {...defaultRenderStyle, backgroundColor: "red"}
            renderText = 'Error!'
    }
    const toRender = (
        <div style={renderStyle}>
            {renderText}
        </div>
    )
    return toRender
}

export default Body