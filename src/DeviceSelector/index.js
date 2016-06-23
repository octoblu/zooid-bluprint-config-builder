import React, { PropTypes } from 'react'
import _ from 'lodash'
import Input from 'zooid-input'

const propTypes = {
  nodeId: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
  nodeName: PropTypes.string.isRequired,
  onUpdate: PropTypes.func,
}
const defaultProps = {
  onUpdate: _.noop,
}

class DeviceSelector extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      useExisting: false
    }
  }
  componentDidUpdate() {
    const { useExisting } = this.state
    const { onUpdate, uuid, nodeId, category, nodeName } = this.props

    if (category !== 'device') return null
    onUpdate({
      shareDevice: useExisting,
      uuid,
      nodeId,
      nodeName
    })
  }

  useExistingDevice = ({ target }) => {
    this.setState({ useExisting: target.checked })
  }

  render() {
    const { useExisting } = this.state

    let configName =
    <Input
      name="configName"
      label="Device Name"
      placeholder="Enter You Device Name Here" />

    if(useExisting) {
      configName = null
    }
    return (
      <div>
        <label htmlFor="useExisting">Share existing device?</label>
        <input
          type="checkbox"
          name="useExistingDevice"
          checked={useExisting}
          onChange={this.useExistingDevice}
        />
      {configName}
      </div>
    )
  }
}

DeviceSelector.propTypes = propTypes
DeviceSelector.defaultProps = defaultProps

export default DeviceSelector
