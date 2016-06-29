import _ from 'lodash'
import React, { PropTypes } from 'react'

import Switch from 'zooid-switch'
import Input from 'zooid-input'

import styles from './styles.css'

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

  update = (newState) => {
    this.setState(newState, () =>{
      const { configName, description, required, showConfigProperty } = this.state
      const { nodeId, nodePropertySchema, nodeProperty, onUpdate } = this.props
      const { type } = nodePropertySchema

      const configureProperty = configName || nodeProperty


      onUpdate({
        configureProperty,
        description,
        nodeId,
        nodeProperty,
        required,
        type,
        enabled: showConfigProperty
      })

    })
  }

  setConfigNameState = ({ target }) => {
    this.update({ configName: target.value })
  }

  setDescriptionState = ({ target }) => {
    this.update({ description: target.value })
  }

  setRequiredFieldState = ({ target }) => {
    this.update({ required: target.checked })
  }

  toggleShowConfigPropertyState = (checked) => {
    if(checked) return this.update({ showConfigProperty: checked })
    return this.update({showConfigProperty: checked, configName: '', description: '', required: false})
  }

  render() {
    const { nodeId, nodePropertySchema, nodeProperty } = this.props

    if (_.isEmpty(nodeId)) return null
    if (_.isEmpty(nodePropertySchema)) return null
    if (_.isEmpty(nodeProperty)) return null

    const { configName, description, requiredField, showConfigProperty } = this.state

    let configureForm = null
    if (showConfigProperty) {
      configureForm = (
        <div className={styles.configureForm}>
          <Input
            name="configProperty"
            label="Property Name"
            helpText="The display name of the property"
            value={configName}
            onChange={this.setConfigNameState}
            required
          />

          <div>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              value={description}
              placeholder="description..."
              onChange={this.setDescriptionState}
            />
          </div>

          <div>
            <label htmlFor="requiredField">
              <input
                type="checkbox"
                name="requiredField"
                checked={requiredField}
                onChange={this.setRequiredFieldState}
              />
              Required
            </label>
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
      {configureForm}
      </div>
    )
  }
}

NodeMapField.propTypes = propTypes
NodeMapField.defaultProps = defaultProps

export default NodeMapField
