import _ from 'lodash';
import React, { PropTypes } from 'react';

const proptypes = {
  nodeId: PropTypes.string,
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

    const { nodeId, nodeProperty, onUpdate } = this.props;
    onUpdate({ nodeId, nodeProperty, configureProperty });
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
    const { nodeId, nodeProperty } = this.props

    if (_.isEmpty(nodeId)) return null;
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

    return (
      <div name={nodeId}>
        <span>{nodeProperty}</span>
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

NodeMapField.proptypes = proptypes;
NodeMapField.defaultProps = defaultProps;

export default NodeMapField;
