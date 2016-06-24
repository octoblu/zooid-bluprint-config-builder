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

  return (
    <div>
      <div className={styles.nodeName}>{nodeSchema.title || node.name}</div>

      <DeviceSelector
        nodeId={node.id}
        category={category}
        type={type}
        uuid={uuid}
        nodeName={node.name}
        onUpdate={onShareDevice}
      />

      <BluprintConfigBuilderItemList
        nodeId={node.id}
        schema={nodeSchema}
        onUpdate={onUpdate}
      />

    </div>
  )
}

BluprintConfigBuilderItem.propTypes = propTypes

export default BluprintConfigBuilderItem
