import _ from 'lodash'
import classNames from 'classnames'
import ReactJsonSchemaForm from 'react-jsonschema-form'
import React, { PropTypes } from 'react'
import { instantiate } from 'json-schema-instantiator'

import NodeMapField from '../NodeMapField'

const propTypes = {
  node: PropTypes.object,
  nodeSchema: PropTypes.object,
}

const BluprintConfigBuilderItem = ({node, nodeSchema}) => {
  if (_.isEmpty(node)) return null
  if (_.isEmpty(nodeSchema)) return null

  const nodeModel = instantiate(nodeSchema, {requiredOptionsOnly: false})
  const nodeProps = _.map(_.keys(nodeModel), (property, index) => {
    return <NodeMapField nodeId={node.id} property={property}/>
  })

  return (
    <form>
      <legend>Node: {nodeSchema.title}</legend>
      {nodeProps}
    </form>
  )
}

BluprintConfigBuilderItem.propTypes = propTypes

export default BluprintConfigBuilderItem
