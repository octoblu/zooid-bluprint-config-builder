import React, { PropTypes } from 'react'
import _ from 'lodash'
import Input from 'zooid-input'

const DeviceSelectorPropertyName = ({configureProperty, shareDevice, onUpdate}) => {
  if (shareDevice) return null
  return (
    <Input
      name="configureProperty"
      label="Config Name"
      description="The display name of the configurable property"
      value={configureProperty}
      placeholder="Enter the config name for this device"
      onChange={onUpdate}
    />
  )
}


DeviceSelectorPropertyName.propTypes = {
  shareDevice: PropTypes.bool,
  configureProperty: PropTypes.string,
  onUpdate: PropTypes.func,
}

DeviceSelectorPropertyName.defaultProps = {
  onUpdate: _.noop,
}

const DeviceSelector = ({shareDevice, nodeId, configureProperty, onUpdate}) => {
  const onConfigPropertyUpdate = (event) => {
    onUpdate({shareDevice, nodeId, configureProperty: event.target.value})
  }

  const onShareDeviceUpdate = (event) => {
    onUpdate({shareDevice: event.target.checked, nodeId, configureProperty})
  }

  return (
    <div>
      <label htmlFor="shareDevice">Share the device currently in the flow?</label>
      <input type="checkbox" name="shareDevice" checked={shareDevice} onChange={onShareDeviceUpdate} />
      <DeviceSelectorPropertyName shareDevice={shareDevice} configureProperty={configureProperty} onUpdate={onConfigPropertyUpdate} />
    </div>
  )
}

DeviceSelector.propTypes = {
  nodeId: PropTypes.string.isRequired,
  shareDevice: PropTypes.bool,
  configureProperty: PropTypes.string,
  onUpdate: PropTypes.func,
}

DeviceSelector.defaultProps = {
  onUpdate: _.noop,
}

export default DeviceSelector
