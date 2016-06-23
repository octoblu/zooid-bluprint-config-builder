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


  onShareDevice = ({ shareDevice, nodeId, nodeName }) => {
    if (shareDevice) return this.shareDevice(nodeId)
    this.dontShareDevice(nodeId, nodeName)
  }


  shareDevice = (nodeId) => {
    const { onUpdate } = this.props

    let { configList } = this.state
    const newConfigList = _.reject(configList, { nodeId, nodeProperty: 'uuid' })
    if( _.isEqual(newConfigList, configList)) return
    this.setState({ configList: newConfigList }, () => {
      onUpdate(this.state.configList)
    })
  }

  dontShareDevice = (nodeId, name) => {
    const { onUpdate } = this.props

    let { configList } = this.state
    const field = _.find(configList, { nodeId, nodeProperty: 'uuid' })
    if (field) return
    configList.push({
      nodeId,
      configureProperty: name,
      nodeProperty: 'uuid',
      type: 'string'
    })
    this.setState({ configList }, () => {
      onUpdate(this.state.configList)
    })
  }

  handleUpdate(updatedConfig) {
    const { onUpdate } = this.props
    const foundConfig = _.find(this.state.configList, {
      nodeId: updatedConfig.nodeId,
      nodeProperty: updatedConfig.nodeProperty,
    })

    if (!foundConfig) {
      this.setState({ configList: [updatedConfig, ...this.state.configList] })
    } else {
      const configIndex = _.findIndex(this.state.configList, {
        nodeId: updatedConfig.nodeId,
        nodeProperty: updatedConfig.nodeProperty,
      })

      this.state.configList[configIndex] = updatedConfig
    }

    onUpdate(this.state.configList)
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
