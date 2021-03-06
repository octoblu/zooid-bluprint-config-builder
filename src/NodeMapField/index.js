import _ from 'lodash'
import React, { PropTypes } from 'react'
import FormField from 'zooid-form-field'
import FormLabel from 'zooid-form-label'
import Input from 'zooid-input'
import Switch from 'zooid-switch'

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
            label="Config Name"
            description="The display name of the configurable property"
            placeholder="Enter the config name"
            value={configName}
            onChange={this.setConfigNameState}
            required
          />

          <FormField>
            <FormLabel name="description">Description</FormLabel>
            <textarea
              name="description"
              value={description}
              placeholder="description..."
              onChange={this.setDescriptionState}
              className={styles.configDescription}
            />
          </FormField>

          <FormField>
            <FormLabel name="requiredField">
              <Input
                type="checkbox"
                name="requiredField"
                checked={requiredField}
                onChange={this.setRequiredFieldState}
                className={styles.requiredCheckbox}
              />
              Required
            </FormLabel>
          </FormField>
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
