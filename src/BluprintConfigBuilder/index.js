import _ from 'lodash';
import React, { PropTypes } from 'react';

import BluprintConfigBuilderItem from '../BluprintConfigBuilderItem';

const propTypes = {
  flow: PropTypes.object,
  nodeSchemas: PropTypes.array,
  onUpdate: PropTypes.func,
};

class BluprintConfigBuilder extends React.Component {
  constructor(props) {
    super(props);

    this.state = { configList: [] }
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(config) {
    if (_.find(this.state.configList, config)) return

    this.setState({ configList: [config, ...this.state.configList] }, () => {
      this.props.onUpdate(this.state.configList)
    })
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
