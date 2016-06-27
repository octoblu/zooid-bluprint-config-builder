import _ from 'lodash'
import React, { PropTypes } from 'react'
import DeviceSelector from '../DeviceSelector'
import BluprintConfigBuilderItemList from './list'

import styles from './styles.css'

const propTypes = {
  node: PropTypes.object,
  nodeSchema: PropTypes.object,
  onUpdate: PropTypes.func,
  onShareDevice: PropTypes.func,
}

const BluprintConfigBuilderItem = ({ node, nodeSchema, onUpdate, onShareDevice }) => {
  if (_.isEmpty(node)) return null
  if (_.isEmpty(nodeSchema)) return null

  const { category, type, uuid } = node

  const onPropertyUpdate = (update) => {
    if (category !== 'device') {
      return onUpdate(update)
    }

    const newNodeProperty = `staticMessage.${update.nodeProperty}`
    const newUpdate = _.defaults({nodeProperty: newNodeProperty}, update)
    onUpdate(newUpdate)
  }

  const renderDeviceSelector = () => {
    if(category !== 'device') return null

    return (
      <DeviceSelector
        nodeId={node.id}
        category={category}
        type={type}
        uuid={uuid}
        nodeName={node.name}
        onUpdate={onShareDevice}
      />
    )
  }

  return (
    <div>
      <div className={styles.nodeName}>{nodeSchema.title || node.name}</div>
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
