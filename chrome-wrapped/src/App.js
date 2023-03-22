import './App.css'
import Body from './components/Body'
import {useState} from 'react'

const App = () => {

  const [currentTab, setCurrentTab] = useState('Overview')

  return (
    <div>
      <Header/>
      <TabRow currentTab={currentTab} setCurrentTab={setCurrentTab}/>
      <Body currentTab={currentTab}/>
    </div>
  )
}

const Header = () => {
  const headerStyle = {
    margin: "auto",
    width: "100%",
    padding: 10,
    textAlign: "center",
  }
  return (
    <h1 style={headerStyle}>Chrome Wrapped (TM)</h1>
  )
}
const TabRow = ({currentTab, setCurrentTab}) => {
  const tabRowStyle = {
    backgroundColor: "inherit",
    margin: "auto",
    padding: "1%",
    maxWidth: "90%",
    display: "flex",
    flexDirection: "row"
  }

  const switchTab = tab => {
    if (!tab) {
      return
    }
    setCurrentTab(tab)
  }
  
  const tab = currentTab

  return (
    <div style={tabRowStyle} className="tab" id="myDIV">
      <button name="Overview" class={tab==='Overview' ? 'selected' : ''} onClick={() => switchTab('Overview')}>Overview</button>
      <button name="Details" class={tab==='Details' ? 'selected' : ''} onClick={() => switchTab('Details')}>Details</button>
      <button name="Browsing Trends" class={tab==='Trends' ? 'selected' : ''} onClick={() => switchTab('Trends')}>Trends</button>
      <button name="Options" class={tab==='Options' ? 'selected' : ''} onClick={() => switchTab('Options')}>Options</button>
    </div>
  )
}

// const Tab = ({name, handler}) => {
//   const tabStyle = {
//     marginRight: 8,
//     paddingLeft: 3,
//     paddingRight: 6,
//     backgroundColor: "pink"
//   }
  
//   return (
//     <button 
//     style={tabStyle} 
//     onClick={handler} 
//     >
//       {name}
//     </button>
//   )
// }

export default App

