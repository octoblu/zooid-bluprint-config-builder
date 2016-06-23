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
      shareExistingDevice: false,
      configProperty: ''
    }
  }
  componentDidUpdate() {
    const { shareExistingDevice } = this.state
    const { onUpdate, uuid, nodeId, category, nodeName, configProperty } = this.props

    if (category !== 'device') return null
    onUpdate({
      shareDevice: shareExistingDevice,
      uuid,
      nodeId,
      nodeName,
      configProperty
    })
  }

  handleShareExistingDeviceToggle = ({ target }) => {
    this.setState({ shareExistingDevice: target.checked })
    if(target.checked){
      this.setState({configProperty: ''})
    }
  }

  handleConfigNameChange = ( {target} ) => {
    console.log("Target", target)
  }

  render(){
    const {category} = this.props
    const { shareExistingDevice, configProperty } = this.state
    if(category !== 'device') return null
    let configName =
    <Input
      name="configProperty"
      label="Config Name"
      value={configProperty}
      placeholder="Enter the name of your configuration here" onChange={this.handleConfigNameChange}/>

    if(shareExistingDevice) {
      configName = null
    }
    return (
      <div>
        <label htmlFor="shareExistingDevice">Share existing device?</label>
        <input
          type="checkbox"
          name="shareExistingDevice"
          checked={shareExistingDevice}
          onChange={this.handleShareExistingDeviceToggle}
        />
      {configName}
      </div>
    )
  }
}

DeviceSelector.propTypes = propTypes
DeviceSelector.defaultProps = defaultProps

export default DeviceSelector
