import React from 'react'
import { getTeamNames } from '../api'
import Sidebar from './Sidebar'

export default function Teams (props) {
  const [teamNames, setTeamNames] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  const { location , match } = props

  React.useEffect(() => {
    getTeamNames()
      .then(teams => {
        setTeamNames(teams)
        setLoading(false)
      })
  }, [])

  return (
    <div className='container two-column'>
      <Sidebar
        loading={loading}
        title='Teams'
        list={teamNames}
        {...props}
      />
      
      {loading === false && location.pathname === '/teams'
        ? <div className='sidebar-instruction'>Select a Team</div>
        : null}
    </div>
  )
}