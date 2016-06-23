import React, { PropTypes } from 'react'
import _ from 'lodash'

const propTypes = {
  onUpdate: PropTypes.func,
  node: PropTypes.object,
  nodeSchemaMapItem: PropTypes.object,
}
const defaultProps = {
  onUpdate: _.noop,
  node: null,
  nodeSchemaMapItem: null
}

class DeviceConfigBuilderItem extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      shareSelectedDevice: false
    }
  }

  render() {
    return null
  }
}

DeviceConfigBuilderItem.propTypes    = propTypes
DeviceConfigBuilderItem.defaultProps = defaultProps

export default DeviceConfigBuilderItem
