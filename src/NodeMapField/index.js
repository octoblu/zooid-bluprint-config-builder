import _ from 'lodash'
import React, { PropTypes } from 'react'

import Switch from 'zooid-switch'
import Input from 'zooid-input'

import styles from './styles.css'

const propTypes = {
  nodeId: PropTypes.string.isRequired,
  nodePropertySchema: PropTypes.object.isRequired,
  nodeProperty: PropTypes.string.isRequired,
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
      const { configName, description, required } = this.state
      const { nodeId, nodePropertySchema, nodeProperty, onUpdate } = this.props
      const { type } = nodePropertySchema

      const configureProperty = configName

      onUpdate({
        configureProperty,
        description,
        nodeId,
        nodeProperty,
        required,
        type,
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
    const { nodeId, nodePropertySchema, nodeProperty, configureProperty, description, required } = this.props
    
    let configureForm = null
    if (showConfigProperty) {
      configureForm = (
        <div className={styles.configureForm}>
          <Input
            name="configProperty"
            label="Config Name"
            value={configName}
            onChange={this.setConfigNameState}
            required
          />

          <div>
            <label htmlFor="requiredField">Required</label>
            <input
              type="checkbox"
              name="requiredField"
              checked={requiredField}
              onChange={this.setRequiredFieldState}
            />
          </div>

          <Input
            name="description"
            value={description}
            label="Description"
            onChange={this.setDescriptionState}
          />

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
