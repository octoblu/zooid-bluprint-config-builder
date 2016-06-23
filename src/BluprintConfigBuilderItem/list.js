import _ from 'lodash'
import React, { PropTypes } from 'react'

import List, { ListItem } from 'zooid-list'
import NodeMapField from '../NodeMapField'

const propTypes = {
  nodeId: PropTypes.string,
  schema: PropTypes.object,
  onUpdate: PropTypes.func,
}

const BluprintConfigBuilderItemList = ({ nodeId, schema, onUpdate }) => {
  const renderedProperties = _.map(_.keys(schema.properties), (property) => {
    const subSchema = schema.properties[property]
    if (subSchema.type === 'object') {
      const onPropertyUpdate = (update) => {
        const newNodeProperty = `${property}.${update.nodeProperty}`
        const newUpdate = _.defaults({nodeProperty: newNodeProperty}, update)
        onUpdate(newUpdate)
      }

      return (
        <ListItem key={`${nodeId}-${property}`} >
          <h4> {property} </h4>
          <BluprintConfigBuilderItemList
            nodeId={nodeId}
            schema={subSchema}
            onUpdate={onPropertyUpdate}
          />
        </ListItem>
      )
    }

    return (
      <ListItem key={`${nodeId}-${property}`}>
        <NodeMapField
          nodeId={nodeId}
          nodeProperty={property}
          nodePropertySchema={schema.properties[property]}
          onUpdate={onUpdate}
        />
      </ListItem>
    )
  })

  return <List>{renderedProperties}</List>
}

BluprintConfigBuilderItemList.propTypes = propTypes

export default BluprintConfigBuilderItemList
