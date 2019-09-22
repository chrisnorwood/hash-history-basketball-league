import React from 'react'
import PropTypes from 'prop-types'

export default function Loading ({ text = 'Loading', speed = 300 }) {
  const [content, setContent] = React.useState(text)

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setContent(content => {
        return content === `${text}...`
          ? text
          : `${content}.`
      })
    }, speed)

    return () => window.clearInterval(id)
  }, [text, speed])

  return (
    <div className='container'>
      <p className='text-center'>
        {content}
      </p>
    </div>
  )
}

Loading.propTypes = {
  text: PropTypes.string,
  speed: PropTypes.number,
}
