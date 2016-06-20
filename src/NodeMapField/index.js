import _ from 'lodash'
import React, { PropTypes } from 'react'

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
      helpText: '',
      showConfigProperty: false,
      required: false,
    }

  }

  componentDidUpdate() {
    const { configName, helpText, required } = this.state
    const configureProperty = configName

    if (_.isEmpty(configureProperty)) return

    const { nodeId, nodePropertySchema, nodeProperty, onUpdate } = this.props
    const { type } = nodePropertySchema

    onUpdate({
      configureProperty,
      helpText,
      nodeId,
      nodeProperty,
      required,
      type,
    })
  }

  setConfigNameState = ({ target }) => {
    this.setState({ configName: target.value })
  }

  setHelpTextState = ({ target }) => {
    this.setState({ helpText: target.value })
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

    const { configName, helpText, requiredField, showConfigProperty } = this.state

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

          <label htmlFor="helpText">Help Text</label>
          <textarea name="helpText" value={helpText} onChange={this.setHelpTextState}/>
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

NodeMapField.propTypes = propTypes
NodeMapField.defaultProps = defaultProps

export default NodeMapField
