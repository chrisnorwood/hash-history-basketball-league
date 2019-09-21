import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './Navbar'
import Home from './Home'
import Players from './Players'
import Teams from './Teams'

function App() {
  return (
    <Router>
      <div>
        <Navbar />

        <Route path='/' exact component={Home} />
        <Route path='/players' component={Players} />
        <Route path='/teams' component={Teams} />
      </div>
    </Router>
  )
}

export default App
