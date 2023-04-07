import './App.css'
import Body from './components/Body'
import {useState} from 'react'

const App = () => {

  const [currentTab, setCurrentTab] = useState('Overview')

  return (
    <div>
      <Header/>
      <TabRow currentTab={currentTab} setCurrentTab={setCurrentTab}/>
      <Body currentTab={currentTab} setCurrentTab={setCurrentTab}/>
    </div>
  )
}

const Header = () => {
  const headerStyle = {
    leftMargin: "auto",
    rightMargin: "auto",
    padding: 0,
    width: 440,
    height: 65,
    display: "block"
  }
  return (
    <img src='./Chrome Wrapped Logo.png' alt='Chrome Wrapped Logo' style={headerStyle}></img>
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
      <button name="Search" class={tab==='Search' ? 'selected' : ''} onClick={() => switchTab('Search')}>Search</button>
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

