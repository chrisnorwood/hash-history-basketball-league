import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { getArticle } from '../api'

export default function Article (props) {
  const [article, setArticle] = useState(null)

  const { teamId, articleId } = props

  const fetchArticle = (teamId, articleId) => {
    setArticle(null)
    getArticle(teamId, articleId).then(setArticle)
  }

  useEffect(() => {
    fetchArticle(teamId, articleId)
  }, [teamId, articleId])

  return (
    props.children(article)
  )
}

Article.propTypes = {
  teamId: PropTypes.string.isRequired,
  articleId: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
}