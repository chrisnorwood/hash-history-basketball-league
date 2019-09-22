import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import slug from 'slug'
import { getTeamsArticles, getTeamNames } from '../api'
import TeamLogo from './TeamLogo'
import Team from './Team'

export default function TeamPage (props) {
  const [articles, setArticles] = React.useState([])
  const [teamNames, setTeamNames] = React.useState({})
  const [loading, setLoading] = React.useState(true)

  const { match } = props
  const { teamId } = match.params

  React.useEffect(() => {
    Promise.all([
      getTeamNames(),
      getTeamsArticles(teamId)
    ]).then(([teamNames, articles]) => {
        setTeamNames(teamNames)
        setArticles(articles)
        setLoading(false)
      })
  }, [teamId])

  // Redirect to Home on non-existent team name
  if (
   loading === false &&
   teamNames.includes(teamId) === false
  ) {
    return <Redirect to='/' />
  }

  // Otherwise, return appropriate team page
  return (
    <div>
      <Team id={teamId}>
        {(team) => team === null
          ? <h1>LOADING</h1>
          : <div className='panel'>
              <TeamLogo id={teamId} />
              <h1 className='medium-header'>{team.name}</h1>
              <h4 styles={{margin: 5}}>
                <Link
                  style={{cursor: 'pointer'}}
                  to={{pathname: '/players', search: `?teamId=${teamId}`}}
                >
                  View Roster
                </Link>
              </h4>
              <ul className='championships'>
               {team.championships.map(ship => <li key={ship}>{ship}</li>)}
              </ul>
              <ul className='info-list row' style={{width: '100%'}}>
                <li>Established<div>{team.established}</div></li>
                <li>Manager<div>{team.manager}</div></li>
                <li>Coach<div>{team.coach}</div></li>
                <li>Record<div>{team.wins}-{team.losses}</div></li>
              </ul>
              <h2 className='header'>
                Articles
              </h2>
              <ul className='articles'>
                {articles.map(article => (
                  <li key={article.id}>
                    <Link to={`${match.url}/articles/${slug(article.title)}`}>
                      <h4 className='article-title'>{article.title}</h4>
                      <div className='article-date'>{article.date.toLocaleDateString()}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>}
      </Team>
    </div>
  )
}