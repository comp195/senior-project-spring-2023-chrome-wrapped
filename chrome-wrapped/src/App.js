import './App.css';

const App = () => {
  const appStyle = {
    maxWidth: 1000,
    margin: "auto",
    paddingBottom: 50
  }
  return (
    <div>
      <Header/>
    </div>
  )
}

const Header = () => {
  const headerStyle = {
    margin: "auto",
    width: "50%",
    padding: 10,
    textAlign: "center"
  }
  return (
    <h1 style={headerStyle}>Chrome Wrapped(TM)</h1>
  )
}


export default App;
