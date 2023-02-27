import './App.css'
import {useState} from 'react'

const App = () => {

  const [currentTab, setCurrentTab] = useState('Overview')

  return (
    <div>
      <Header/>
      <TabRow currentTab={currentTab} setCurrentTab={setCurrentTab}/>
    </div>
  )
}

const Header = () => {
  const headerStyle = {
    margin: "auto",
    width: "50%",
    padding: 10,
    textAlign: "center",
    backgroundColor: "lightBlue"
  }
  return (
    <h1 style={headerStyle}>Chrome Wrapped(TM)</h1>
  )
}
const TabRow = ({currentTab, setCurrentTab}) => {
  const tabRowStyle = {
    backgroundColor: "coral",
    margin: "auto",
    padding: 3,
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

  return (
    <div style={tabRowStyle}>
      <Tab name="Overview" handler={() => switchTab('Overview')}/>
      <Tab name="Detailed View" handler={() => switchTab('Detailed')}/>
      <Tab name="Browsing Trends" handler={() => switchTab('Trends')}/>
      <Tab name="Options" handler={() => switchTab('Options')}/>
    </div>
  )
}

const Tab = ({name, handler}) => {
  const tabStyle = {
    marginRight: 8,
    paddingLeft: 3,
    paddingRight: 6,
    backgroundColor: "pink",
    borderRadius: 4
  }
  return (
    <div 
    style={tabStyle} 
    onClick={handler} 
    >
      {name}
    </div>
  )
}


