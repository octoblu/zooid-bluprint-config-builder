import _ from 'lodash'
import React, { PropTypes } from 'react'
import DeviceSelector from '../DeviceSelector'
import BluprintConfigBuilderItemList from './list'

import styles from './styles.css'

const propTypes = {
  node: PropTypes.object,
  nodeSchema: PropTypes.object,
  shareDevice: PropTypes.bool,
  onUpdate: PropTypes.func,
  onShareDevice: PropTypes.func,
}

const BluprintConfigBuilderItem = (props) => {
  const {
    node,
    nodeSchema,
    shareDevice,
    onUpdate,
    onShareDevice,
  } = props

  if (_.isEmpty(node)) return null
  if (_.isEmpty(nodeSchema)) return null

  const { category } = node

  const onPropertyUpdate = (update) => {
    if (category !== 'device') {
      return onUpdate(update)
    }

    const newNodeProperty = `staticMessage.${update.nodeProperty}`
    const newUpdate = _.defaults({nodeProperty: newNodeProperty}, update)
    onUpdate(newUpdate)
  }

  const renderDeviceSelector = () => {
    if (category !== 'device') return null

    return (
      <DeviceSelector
        nodeId={node.id}
        shareDevice={shareDevice}
        onUpdate={onShareDevice}
      />
    )
  }

  const getHeader = () => {
    if (category === 'device') return `${node.name} - ${nodeSchema.title}`
    return nodeSchema.title || node.name
  }

  return (
    <div>
      <div className={styles.nodeName}>{getHeader()}</div>

      {renderDeviceSelector()}

      <BluprintConfigBuilderItemList
        nodeId={node.id}
        schema={nodeSchema}
        onUpdate={onPropertyUpdate}
      />
    </div>
  )
}

BluprintConfigBuilderItem.propTypes = propTypes

export default BluprintConfigBuilderItem
