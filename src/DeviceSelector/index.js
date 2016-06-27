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
      configureProperty: ''
    }
  }

  update = () => {
    const { shareExistingDevice, configureProperty } = this.state
    const { onUpdate, uuid, nodeId, category, nodeName, type } = this.props

    if (category !== 'device') return null

    let config = {
      uuid,
      nodeId,
      shareDevice: shareExistingDevice,
      deviceType: type,
      configureProperty: configureProperty || nodeName
    }

    onUpdate(config)
  }

  handleShareExistingDeviceToggle = ({ target }) => {
    console.log('handleShareExistingDeviceToggle')

    this.setState({ shareExistingDevice: target.checked }, this.update)
    if(target.checked){
      this.setState({configureProperty: ''}, this.update)
    }

  }

  handleConfigNameChange = ( {target} ) => {
    console.log('handleConfigNameChange')
    this.setState({configureProperty: target.value || this.props.nodeName}, this.update)
  }

  render(){
    let configName
    const {category} = this.props
    const { shareExistingDevice} = this.state

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
