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
    width: "50%",
    padding: 10,
    textAlign: "center",
  }
  return (
    <h1 style={headerStyle}>Chrome Wrapped(TM)</h1>
  )
}

const TabRow = ({currentTab, setCurrentTab}) => {
  const tabRowStyle = {
    backgroundColor: "coral",
    margin: "auto",
    padding: "3%",
    maxWidth: "90%",
    display: "flex",
    flexDirection: "row",
  }

  const switchTab = tab => {
    if (!tab) {
      return
    }
    setCurrentTab(tab)
  }

  return (
    <div style={tabRowStyle} class="tab">
      <button name="Overview" onClick={() => switchTab('Overview')}>Overview</button>
      <button name="Detailed View" onClick={() => switchTab('Details')}>Details</button>
      <button name="Browsing Trends" onClick={() => switchTab('Trends')}>Trends</button>
      <button name="Options" onClick={() => switchTab('Options')}>Options</button>
    </div>
  
  )
}


export default App;
