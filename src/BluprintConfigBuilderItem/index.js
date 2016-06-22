import _ from 'lodash'
import React, { PropTypes } from 'react'

import Heading from 'zooid-heading'
import List, { ListItem } from 'zooid-list'
import NodeMapField from '../NodeMapField'
import DeviceSelector from '../DeviceSelector'

const propTypes = {
  node: PropTypes.object,
  nodeSchema: PropTypes.object,
  onUpdate: PropTypes.func,
  onShareDevice: PropTypes.func,
}

const BluprintConfigBuilderItem = ({ node, nodeSchema, onUpdate, onShareDevice }) => {
  if (_.isEmpty(node)) return null
  if (_.isEmpty(nodeSchema)) return null

  const nodeProperties = nodeSchema.properties
  const { category, type, uuid } = node

  const nodeProps = _.map(_.keys(nodeProperties), (property, index) => {
    return (
      <ListItem>
        <NodeMapField
          nodeId={node.id}
          nodeProperty={property}
          nodePropertySchema={nodeProperties[property]}
          onUpdate={onUpdate}
          key={index}
        />
      </ListItem>
    )
  })

  return (
    <div>
      <Heading level={5}>Node: {nodeSchema.title || node.name}</Heading>
      <DeviceSelector
        nodeId={node.id}
        category={category}
        type={type}
        uuid={uuid}
        nodeName={node.name}
        onUpdate={onShareDevice}
      />
      <List>{nodeProps}</List>
    </div>
  )
}

BluprintConfigBuilderItem.propTypes = propTypes

export default BluprintConfigBuilderItem
