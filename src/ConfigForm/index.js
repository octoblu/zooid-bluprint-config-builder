import React, { PropTypes } from 'react'

import styles from './styles.css'

const propTypes = {}
const defaultProps = {}

const ConfigForm = () => {
  return (
    <div className={styles.configForm}>
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

ConfigForm.propTypes    = propTypes
ConfigForm.defaultProps = defaultProps

export default ConfigForm
