import _ from 'lodash';
import React, { PropTypes } from 'react';

const propTypes = {
  nodeId: PropTypes.string,
  nodePropertySchema: PropTypes.object,
  nodeProperty: PropTypes.string,
  onUpdate: PropTypes.func,
};

const defaultProps = {
  onUpdate: _.noop,
};

class NodeMapField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      configName: '',
      showConfigProperty: false,
    };

    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.updateConfigureState = this.updateConfigureState.bind(this);
    this.updateConfigNameState = this.updateConfigNameState.bind(this);
  }

  componentDidUpdate() {
    const configureProperty = this.state.configName;

    if (_.isEmpty(configureProperty)) return

    const { nodeId, nodePropertySchema, nodeProperty, onUpdate } = this.props;
    const { type } = nodePropertySchema

    onUpdate({
      configureProperty,
      nodeId,
      nodeProperty,
      type,
    });
  }

  updateConfigureState() {
    this.setState({
      showConfigProperty: !this.state.showConfigProperty,
    });
  }

  updateConfigNameState({ target }) {
    this.setState({
      configName: target.value,
    });
  }

  render() {
    const { nodeId, nodePropertySchema, nodeProperty } = this.props

    if (_.isEmpty(nodeId)) return null;
    if (_.isEmpty(nodePropertySchema)) return null;
    if (_.isEmpty(nodeProperty)) return null;

    const { showConfigProperty } = this.state;

    let configureInput = null;
    if (showConfigProperty) {
      configureInput = (
        <input
          type="text"
          name="configProperty"
          value={this.state.configName}
          onChange={this.updateConfigNameState}
          required
        />
      );
    }

    console.log('nodePropertySchema', nodePropertySchema, nodeProperty);
    return (
      <div name={nodeId}>
        <span>{nodePropertySchema.title || nodeProperty}</span>
        <input
          type="checkbox"
          name={`${nodeId}.${nodeProperty}`}
          checked={showConfigProperty}
          onClick={this.updateConfigureState}
        />
        {configureInput}
      </div>
    );
  }
}

NodeMapField.propTypes = propTypes;
NodeMapField.defaultProps = defaultProps;

export default NodeMapField;
