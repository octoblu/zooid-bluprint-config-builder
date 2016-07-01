import _ from 'lodash'
import React, { PropTypes } from 'react'
import DeviceSelector from '../DeviceSelector'
import BluprintConfigBuilderItemList from '../BluprintConfigBuilderItemList/'

import styles from './styles.css'

const propTypes = {
  node: PropTypes.object,
  nodeSchema: PropTypes.object,
  shareDevice: PropTypes.bool,
  onUpdate: PropTypes.func,
  onShareDevice: PropTypes.func,
}

const BluprintDeviceConfigBuilderItem = (props) => {
  const {
    node,
    nodeSchema,
    shareDevice,
    onUpdate,
    onShareDevice,
  } = props

  if (_.isEmpty(node)) return null
  if (_.isEmpty(nodeSchema)) return null

  const onPropertyUpdate = (update) => {
    const newNodeProperty = `staticMessage.${update.nodeProperty}`
    const newUpdate = _.defaults({nodeProperty: newNodeProperty}, update)
    onUpdate(newUpdate)
  }

  return (
    <div>
      <div className={styles.nodeName}>{`${node.name} - ${nodeSchema.title}`}</div>

      <DeviceSelector
        nodeId={node.id}
        shareDevice={shareDevice}
        onUpdate={onShareDevice}
      />

      <BluprintConfigBuilderItemList
        nodeId={node.id}
        schema={nodeSchema}
        onUpdate={onPropertyUpdate}
      />
    </div>
  )
}

BluprintDeviceConfigBuilderItem.propTypes = propTypes

export default BluprintDeviceConfigBuilderItem
