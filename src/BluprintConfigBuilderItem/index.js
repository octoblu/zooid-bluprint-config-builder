import _ from 'lodash'
import React, { PropTypes } from 'react'
import BluprintConfigBuilderItemList from '../BluprintConfigBuilderItemList/'

import styles from './styles.css'

const propTypes = {
  node: PropTypes.object,
  nodeSchema: PropTypes.object,
  onUpdate: PropTypes.func,
}

const BluprintConfigBuilderItem = ({ node, nodeSchema, onUpdate }) => {
  if (_.isEmpty(node)) return null
  if (_.isEmpty(nodeSchema)) return null


  return (
    <div>
      <div className={styles.nodeName}>{`${node.name} - ${nodeSchema.title}`}</div>

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
