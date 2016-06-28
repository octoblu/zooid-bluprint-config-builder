import React, { PropTypes } from 'react'
import _ from 'lodash'
import Input from 'zooid-input'

const propTypes = {
  nodeId: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
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
      configureProperty: ''
    }
  }

  update = (newState) => {
    this.setState(newState, ()=> {
      const { shareExistingDevice, configureProperty } = this.state
      const { onUpdate, uuid, nodeId, category, type } = this.props

      let config = {
        uuid,
        nodeId,
        shareDevice: shareExistingDevice,
        deviceType: type,
        configureProperty: configureProperty
      }

      onUpdate(config)
    })
  }

  handleShareExistingDeviceToggle = ({ target }) => {
    let newState = {shareExistingDevice: target.checked}
    if(target.checked) {
      newState.configureProperty = ''
    }

    this.update(newState)
  }

  handleConfigNameChange = ( {target} ) => {
    this.update({configureProperty: target.value})
  }

  render(){
    let configName
    const {category} = this.props
    const { shareExistingDevice } = this.state

    return (
      <div>
        <label htmlFor="shareExistingDevice">Share existing device?</label>
        <input
          type="checkbox"
          name="shareExistingDevice"
          checked={shareExistingDevice}
          onChange={this.handleShareExistingDeviceToggle}
        />
      {this.getConfigInput()}
      </div>
    )
  }

  getConfigInput() {
    const { shareExistingDevice, configureProperty } = this.state
    if(shareExistingDevice) return null

    return (
     <Input
       name="configureProperty"
       label="Config Name"
       value={configureProperty}
       placeholder="Enter the name of your configuration here" onChange={this.handleConfigNameChange}
       onChange={this.handleConfigNameChange}
     />
    )
  }
}

DeviceSelector.propTypes = propTypes
DeviceSelector.defaultProps = defaultProps

export default DeviceSelector
