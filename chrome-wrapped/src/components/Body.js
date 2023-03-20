import RingChart from '../charts/Ring'
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
            return (
                <div>
                    <RingChart />
                </div>
            )
            break
        case'Details':
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