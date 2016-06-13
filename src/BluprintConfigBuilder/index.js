import _ from 'lodash';
import React, { PropTypes } from 'react';

import BluprintConfigBuilderItem from '../BluprintConfigBuilderItem';

const propTypes = {
  flow: PropTypes.object,
  nodeSchemas: PropTypes.object,
  onUpdate: PropTypes.func,
};

class BluprintConfigBuilder extends React.Component {
  constructor(props) {
    super(props);

    this.state = { configList: [] }
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(updatedConfig) {
    const { onUpdate } = this.props
    const foundConfig = _.find(this.state.configList, {
      nodeId: updatedConfig.nodeId,
      nodeProperty: updatedConfig.nodeProperty,
    })

    if (!foundConfig) {
      this.setState({ configList: [updatedConfig, ...this.state.configList] })
    } else {
      const configIndex = _.findIndex(this.state.configList, {
        nodeId: updatedConfig.nodeId,
        nodeProperty: updatedConfig.nodeProperty,
      })

      this.state.configList[configIndex] = updatedConfig
    }

    onUpdate(this.state.configList)
  }

  render() {
    const { flow, nodeSchemas } = this.props;

    if (_.isEmpty(flow)) return null;
    if (_.isEmpty(flow.nodes)) return null;
    if (_.isEmpty(nodeSchemas)) return null;

    const items = _.map(flow.nodes, (node) => (
      <BluprintConfigBuilderItem
        node={node}
        nodeSchema={nodeSchemas[node.class]}
        onUpdate={this.handleUpdate}
        key={node.id}
      />
    ));

    return <div>{items}</div>
  }
}

BluprintConfigBuilder.propTypes = propTypes;

export default BluprintConfigBuilder;
