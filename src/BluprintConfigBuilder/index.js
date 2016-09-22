import _ from 'lodash'
import React, { PropTypes } from 'react'

import BluprintConfigBuilderItem from '../BluprintConfigBuilderItem'
import BluprintDeviceConfigBuilderItem from '../BluprintDeviceConfigBuilderItem'

const propTypes = {
  nodes: PropTypes.array,
  operationSchemas: PropTypes.object,
  deviceSchemas: PropTypes.object,
  onUpdate: PropTypes.func,
  onShareDevice: PropTypes.func,
}

class BluprintConfigBuilder extends React.Component {
  state = {
    configList: [],
    sharedNodes: []
  }

  update = (newState) => {
    this.setState(newState, () => {
      const { onUpdate, nodes } = this.props
      const configSchema = this.mappingToConfig(this.state.configList)
      const {sharedNodes} = this.state

      const sharedDevices = _(nodes)
        .filter((node) => _.includes(sharedNodes, node.id))
        .map(({uuid, eventType='message'}) => ({uuid, eventTypes: [eventType]}))
        .uniq()
        .value()

      onUpdate({configSchema, sharedDevices})
    })
  }

  onShareDevice = ({shareDevice, nodeId, configureProperty}) => {
    if (shareDevice) return this.shareDevice(nodeId)
    this.dontShareDevice({nodeId, configureProperty})
  }

  shareDevice = (nodeId) => {
    let { sharedNodes, configList } = this.state
    configList = _.reject(configList, {nodeId, nodeProperty: 'uuid'})
    sharedNodes.push(nodeId)
    this.update({sharedNodes, configList})
  }

  dontShareDevice = ({nodeId, configureProperty}) => {
    const {nodes} = this.props
    let { configList, sharedNodes } = this.state

    configList  = _.reject(configList, { nodeId, nodeProperty: 'uuid' })
    sharedNodes = _.without(sharedNodes, nodeId)
    const {type} = _.find(nodes, {id: nodeId})

    configList.push({
      nodeId,
      configureProperty,
      nodeProperty: 'uuid',
      type: 'string',
      deviceType: type
    })

    this.update({sharedNodes, configList})
  }

  mappingToConfig = (configList) => {
    const config = {
      type: 'object',
      properties: {},
    }

    _.each(configList, function (mapping) {
      let property = config.properties[mapping.configureProperty] || {}
      property = _.defaults(property, _.pick(mapping, ['required', 'description', 'type', 'enum']))

      if(mapping.deviceType) {
        property['x-meshblu-device-filter'] = {type: mapping.deviceType}
        property.format = 'meshblu-device'
      }

      property['x-node-map'] = property['x-node-map'] || []
      property['x-node-map'].push({ id: mapping.nodeId, property: mapping.nodeProperty })

      config.properties[mapping.configureProperty] = property
    })

    return config
  }

  handleUpdate = (updatedConfig) => {
    const {nodeId, nodeProperty, enabled} = updatedConfig

    delete updatedConfig.enabled
    let configList = _.reject(this.state.configList, {nodeId, nodeProperty})

    if(enabled) configList.push(updatedConfig)
    this.update({configList})
  }

  getNodeSchema = (node) => {
    const {operationSchemas, deviceSchemas={}} = this.props
    const nodeType = _.last(node.type.split(':'))
    const {uuid, eventType='message'} = node

    const emptySchema = {
      message: {
        title: node.name,
        type: 'object'
      }
    }

    if(node.category === 'device' || node.category === 'endo') {
      const schemas = deviceSchemas[uuid]

      if (!schemas) return emptySchema
      if (!schemas.version) return schema[eventType] || emptySchema

      let schema = schemas[eventType][node.selectedSchemaKey]
      if (schema) return schema

      schema = schemas[eventType]['Default']
      if (schema) return schema
      schema = _.first(_.values(schemas[eventType]))
      if (schema) return schema
      return emptySchema
    }

    return operationSchemas[nodeType]
  }

  render() {
    const { nodes} = this.props
    const {sharedNodes} = this.state

    if (_.isEmpty(nodes)) return null

    const items = _.map(nodes, (node) => {
      const nodeSchema = this.getNodeSchema(node)
      if(node.category != "device" && node.category != "endo") {
        return (
          <BluprintConfigBuilderItem
            node={node}
            nodeSchema={nodeSchema}
            onUpdate={this.handleUpdate}
            key={node.id}
          />
        )
      }
      return (
        <BluprintDeviceConfigBuilderItem
          node={node}
          nodeSchema={this.getNodeSchema(node)}
          shareDevice={_.includes(sharedNodes, node.id)}
          onUpdate={this.handleUpdate}
          onShareDevice={this.onShareDevice}
          key={node.id}
        />
      )
    })
    return <div>{items}</div>
  }
}

BluprintConfigBuilder.propTypes = propTypes

export default BluprintConfigBuilder
