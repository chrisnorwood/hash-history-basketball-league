import React from 'react'
import { Route, Link } from 'react-router-dom'
import { parse } from 'query-string'
import slug from 'slug' 
import { getPlayers } from '../api'
import Sidebar from './Sidebar'

export default function Players (props) { 
  const [players, setPlayers] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  
  const { match, location } = props

  const fetchPlayers = (teamId) => {
    getPlayers(teamId)
      .then(players => {
        setPlayers(players)
        setLoading(false)
      })
  }

  React.useEffect(() => {
    location.search
      ? fetchPlayers(parse(location.search).teamId)
      : fetchPlayers()
  }, [location])

  return (
    <div className='container two-column'>
      <Sidebar
        loading={loading}
        title='Players'
        list={players.map(player => player.name)}
        {...props}
      />

      {loading === false && location.pathname === '/players'
        ? <div className='sidebar-instruction'>Select a Player</div>
        : null}
    </div>
  )
}