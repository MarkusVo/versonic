import React from 'react'
import { object } from 'prop-types'

const AppShell = ({ someProps }) => {
  return (
    <div>Test AppShell</div>
  )
}

AppShell.propTypes = {
  someProps: object
}

AppShell.defaultProps = {
  someProps: {}
}

export default AppShell
