import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import history from './history'

const root = ReactDOM.createRoot(document.getElementById('root'))
history.runScript()
root.render(<App />)
