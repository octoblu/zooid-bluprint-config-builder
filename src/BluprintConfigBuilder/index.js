import _ from 'lodash'
import classNames from 'classnames'
import React, { PropTypes } from 'react'

import BluprintConfigBuilderItem from '../BluprintConfigBuilderItem'

const proptypes = {
  flow: PropTypes.object,
  nodeSchemas: PropTypes.array
}

const BluprintConfigBuilder = ({flow, nodeSchemas}) => {
  if (_.isEmpty(flow)) return null
  if (_.isEmpty(flow.nodes)) return null
  if (_.isEmpty(nodeSchemas)) return null

  const items = _.map(flow.nodes, (node) => {
    const nodeSchema = nodeSchemas[node.class]
    return <BluprintConfigBuilderItem node={node} nodeSchema={nodeSchema} key={node.id} />
  })

  return <div>{items}</div>
}

BluprintConfigBuilder.proptypes = proptypes

export default BluprintConfigBuilder
