import React from 'react'
import { Route } from 'react-router-dom'
import { getTeamsArticles } from '../api'
import Sidebar from './Sidebar'
import Article from './Article'

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

        <Route path={`${url}/:articleId`} render={({ match }) => (
          <Article
            articleId={match.params.articleId}
            teamId={teamId}
          >
            {(article) => !article ? <h1>LOADING</h1> : (
              <div className='panel'>
                <article className='article' key={article.id}>
                  <h1 className='header'>{article.title}</h1>
                  <p>{article.body}</p>
                </article>
              </div>
            )}
          </Article>
        )} />
      </div>
}