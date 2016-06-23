import _ from 'lodash'
import React, { PropTypes } from 'react'

import List, { ListItem } from 'zooid-list'
import NodeMapField from '../NodeMapField'

const propTypes = {
  nodeId: PropTypes.object,
  schema: PropTypes.object,
  onUpdate: PropTypes.func,
}

const BluprintConfigBuilderItemList = ({ nodeId, schema, onUpdate }) => {
  const renderedProperties = _.map(_.keys(schema.properties), (property) => {
    const subSchema = schema.properties[property]
    console.log(subSchema)
    if (subSchema.type === 'object') {
      return <ListItem> <h2> I Should make a new BluprintConfigBuilderItemList </h2> </ListItem>
    }

    return (
      <ListItem>
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
