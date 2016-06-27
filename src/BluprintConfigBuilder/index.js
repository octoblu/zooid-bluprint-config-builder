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
  constructor(props) {
    super(props)
    this.state = { configList: [] }
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  componentDidUpdate() {
    const { onUpdate } = this.props
    const configSchema = this.mappingToConfig(this.state.configList)

    onUpdate(configSchema)
  }

  onShareDevice = (options) => {

    const {shareDevice, nodeId} = options
    console.log('onShareDevice', options)

    if (shareDevice) return this.shareDevice(nodeId)
    this.dontShareDevice(options)
  }

  shareDevice = (nodeId) => {
    let { configList } = this.state
    const newConfigList = _.reject(configList, { nodeId, nodeProperty: 'uuid' })

    if( _.isEqual(newConfigList, configList)) return
    this.setState({ configList: newConfigList })
  }

  dontShareDevice = (mapping) => {
    const {nodeId, deviceType, configureProperty} = mapping
    let { configList } = this.state

    configList = _.reject(configList, { nodeId, nodeProperty: 'uuid' })

    configList.push({
      nodeId,
      deviceType,
      configureProperty,
      nodeProperty: 'uuid',
      type: 'string'
    })

    if( _.isEqual(configList, this.state.configList)) return
    this.setState({configList})
  }

  mappingToConfig(configList) {
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

  handleUpdate(updatedConfig) {
    const {nodeId, nodeProperty} = updatedConfig
    let configList = _.reject(this.state.configList, {nodeId, nodeProperty})
    configList.push(updatedConfig)

    if(_.isEqual(configList, this.state.configList)) return
    this.setState({configList})
  }

  getNodeSchema(node) {
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
