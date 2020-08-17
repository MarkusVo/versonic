import React from 'react'
import { object } from 'prop-types'

const Menue = ({ someProps }) => {
  return (
    <div>Test Menue</div>
  )
}

Menue.propTypes = {
  someProps: object
}

Menue.defaultProps = {
  someProps: {}
}

export default Menue
