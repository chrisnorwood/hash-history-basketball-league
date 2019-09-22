import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { getTeam } from '../api'

export default function Team (props) {
  const [team, setTeam] = useState(null)

  const fetchTeam = (id) => {
    setTeam(null)
    getTeam(id).then(setTeam)
  }

  useEffect(() => {
    fetchTeam(props.id)
  }, [props.id])

  return (
    props.children(team)
  )
}

Team.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
}