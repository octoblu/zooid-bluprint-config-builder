import _ from 'lodash'
import classNames from 'classnames'
import ReactJsonSchemaForm from 'react-jsonschema-form'
import React, { PropTypes } from 'react'
import {instantiate} from 'json-schema-instantiator'

const propTypes = {
  node: PropTypes.object,
  nodeSchema: PropTypes.object,
}

const BluprintConfigBuilderItem = ({node, nodeSchema}) => {
  if (_.isEmpty(node)) return null
  if (_.isEmpty(nodeSchema)) return null

  const nodeModel = instantiate(nodeSchema, {requiredOptionsOnly: false})
  const nodeProps = _.map(_.keys(nodeModel), (property, index) => {
    return (
      <li name={property}>{property} <input type="checkbox" /></li>
    )
  })

  return (
    <div>
      <header>Node: {nodeSchema.title}</header>
      <ul>{nodeProps}</ul>
    </div>
  )
}

BluprintConfigBuilderItem.propTypes = propTypes

export default BluprintConfigBuilderItem
