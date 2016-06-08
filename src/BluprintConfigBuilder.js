import classNames from 'classnames'
import React, { PropTypes } from 'react'
import _ from 'lodash'
import styles from './BluprintConfigBuilder.css'
const proptypes = {
  flow: PropTypes.object
}
const BluprintConfigBuilder = ({flow}) => {
  if(_.isEmpty(flow)) return null
  return (<div>{flow.flowId}</div>)
}
BluprintConfigBuilder.proptypes = proptypes
export default BluprintConfigBuilder
