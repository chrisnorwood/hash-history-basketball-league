import React from 'react'
import { Route } from 'react-router-dom'
import { getTeamsArticles } from '../api'
import Sidebar from './Sidebar'

export default function Articles (props) {
  const [teamsArticles, setTeamsArticles] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  
  const { match } = props
  const { params, url } = match
  const { teamId } = params

  React.useEffect(() => {
    getTeamsArticles(teamId)
      .then(teamsArticles => {
        setTeamsArticles(teamsArticles.map(article => article.title))
        setLoading(false)
      })
  }, [teamId])

  return loading === true
    ? <h1>LOADING</h1>
    : <div className='container two-column'>
        <Sidebar
          loading={loading}
          title='Articles'
          list={teamsArticles}
          {...props}
        />
      </div>
}