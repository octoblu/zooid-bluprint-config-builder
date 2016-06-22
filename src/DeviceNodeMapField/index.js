import _ from 'lodash'
import React, { PropTypes } from 'react'

const propTypes = {
  nodeId: PropTypes.string,
  nodePropertySchema: PropTypes.object,
  nodeProperty: PropTypes.string,
  onUpdate: PropTypes.func,
}

const defaultProps = {
  onUpdate: _.noop
}

class DeviceNodeMapField extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      configName: '',
      description: '',
      showConfigProperty: false,
      required: false,
    }
  }

  componentDidUpdate() {
    const { configName, description, required } = this.state
    const configureProperty = configName

    if (_.isEmpty(configureProperty)) return

    const { nodeId, nodePropertySchema, nodeProperty, onUpdate } = this.props
    const { type } = nodePropertySchema

    onUpdate({
      configureProperty,
      description,
      nodeId,
      nodeProperty,
      required,
      type,
    })
  }

  setConfigNameState = ({ target }) => {
    this.setState({ configName: target.value })
  }

  setDescriptionState = ({ target }) => {
    this.setState({ description: target.value })
  }

  setRequiredFieldState = ({ target }) => {
    this.setState({ required: target.checked })
  }

  toggleShowConfigPropertyState = ({ target }) => {
    this.setState({ showConfigProperty: target.checked })
  }

  render() {
    const { nodeId, nodePropertySchema, nodeProperty } = this.props

    if (_.isEmpty(nodeId)) return null
    if (_.isEmpty(nodePropertySchema)) return null
    if (_.isEmpty(nodeProperty)) return null

    const { configName, description, requiredField, showConfigProperty } = this.state

    let configureInput = null
    if (showConfigProperty) {
      configureInput = (
        <div>
          <label htmlFor="configProperty">Config Name</label>
          <input
            type="text"
            name="configProperty"
            value={configName}
            onChange={this.setConfigNameState}
            required
          />

          <label htmlFor="requiredField">Required</label>
          <input
            type="checkbox"
            name="requiredField"
            checked={requiredField}
            onChange={this.setRequiredFieldState}
          />

          <label htmlFor="description">Description</label>
          <textarea name="description" value={description} onChange={this.setDescriptionState} />
        </div>
      )
    }

    return (
      <div name={nodeId}>
        <span>{nodePropertySchema.title || nodeProperty}</span>
        <input
          type="checkbox"
          name={`${nodeId}.${nodeProperty}`}
          checked={showConfigProperty}
          onChange={this.toggleShowConfigPropertyState}
        />
        {configureInput}
      </div>
    )
  }
}

DeviceNodeMapField.propTypes = propTypes
DeviceNodeMapField.defaultProps = defaultProps

export default DeviceNodeMapField
