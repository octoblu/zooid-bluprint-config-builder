import _ from 'lodash'
import React, { PropTypes } from 'react'

import Switch from 'zooid-switch'

const propTypes = {
  nodeId: PropTypes.string,
  nodePropertySchema: PropTypes.object,
  nodeProperty: PropTypes.string,
  onUpdate: PropTypes.func,
}

const defaultProps = {
  onUpdate: _.noop,
}

class NodeMapField extends React.Component {
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

  toggleShowConfigPropertyState = (checked) => {
    this.setState({ showConfigProperty: checked })
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
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <textarea name="description" value={description} onChange={this.setDescriptionState} />
          </div>
        </div>
      )
    }

    return (
      <div name={nodeId}>
        <Switch
          name={`${nodeId}.${nodeProperty}`}
          on={showConfigProperty}
          onChange={this.toggleShowConfigPropertyState}
          label={nodePropertySchema.title || nodeProperty}
        />
        {configureInput}
      </div>
    )
  }
}

NodeMapField.propTypes = propTypes
NodeMapField.defaultProps = defaultProps

export default NodeMapField
