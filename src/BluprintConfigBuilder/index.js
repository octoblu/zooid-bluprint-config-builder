import _ from 'lodash'
import React, { PropTypes } from 'react'

import BluprintConfigBuilderItem from '../BluprintConfigBuilderItem'

const propTypes = {
  nodes: PropTypes.array,
  operationSchemas: PropTypes.object,
  onUpdate: PropTypes.func,
  onShareDevice: PropTypes.func,
}

class BluprintConfigBuilder extends React.Component {

  state = {
    configList: [],
    sharedNodes: []
  }

  componentDidUpdate() {
    const { onUpdate } = this.props
    const configSchema = this.mappingToConfig(this.state.configList)
    const {sharedNodes} = this.state
    const sharedDevices = _.uniq( _.map(sharedNodes, 'uuid') )

    onUpdate({configSchema, sharedDevices})
  }

  onShareDevice = (options) => {
    const {shareDevice, nodeId} = options

    if (shareDevice) return this.shareDevice(options)
    this.dontShareDevice(options)
  }

  shareDevice = ({nodeId, uuid}) => {
    let { sharedNodes, configList } = this.state
    configList = _.reject(configList, { nodeId, nodeProperty: 'uuid' })

    sharedNodes.push({nodeId, uuid})

    this.setState({ sharedNodes, configList })
  }

  dontShareDevice = ({nodeId, uuid, deviceType, configureProperty}) => {
    let { configList, sharedNodes } = this.state

    configList  = _.reject(configList, { nodeId, nodeProperty: 'uuid' })
    sharedNodes = _.reject(sharedNodes, {nodeId, uuid})

    configList.push({
      nodeId,
      deviceType,
      configureProperty,
      nodeProperty: 'uuid',
      type: 'string'
    })

    this.setState({configList, sharedNodes})
  }

  mappingToConfig = (configList) => {
    const config = {
      type: 'object',
      properties: {},
    }

    _.each(configList, function (mapping) {
      let property = config.properties[mapping.configureProperty] || {}
      property = _.defaults(property, _.pick(mapping, ['required', 'description', 'type', 'enum']))

      if(mapping.deviceType) property['x-device-type'] = mapping.deviceType
      property['x-node-map'] = property['x-node-map'] || []
      property['x-node-map'].push({ id: mapping.nodeId, property: mapping.nodeProperty })

      config.properties[mapping.configureProperty] = property
    })

    return config
  }

  handleUpdate = (updatedConfig) => {
    const {nodeId, nodeProperty} = updatedConfig
    let configList = _.reject(this.state.configList, {nodeId, nodeProperty})
    configList.push(updatedConfig)

    if(_.isEqual(configList, this.state.configList)) return
    this.setState({configList})
  }

  getNodeSchema = (node) => {
    const {operationSchemas, deviceSchemas={} } = this.props
    const nodeType = _.last(node.type.split(':'))

    const emptySchema = {
      message: {
        title: node.name,
        type: 'object'
      }
    }

    if(node.category === 'device') {
      return deviceSchemas[nodeType][node.selectedSchemaKey] || emptySchema
    }

    return operationSchemas[nodeType]
  }

  render() {
    const { nodes} = this.props

    if (_.isEmpty(nodes)) return null

    const items = _.map(nodes, (node) => {
      return (
        <BluprintConfigBuilderItem
          node={node}
          nodeSchema={this.getNodeSchema(node)}
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
