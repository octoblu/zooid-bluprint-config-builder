import _ from 'lodash';
import React, { PropTypes } from 'react';
import { instantiate } from 'json-schema-instantiator';

import NodeMapField from '../NodeMapField';

const propTypes = {
  node: PropTypes.object,
  nodeSchema: PropTypes.object,
  onUpdate: PropTypes.func,
};

const BluprintConfigBuilderItem = ({ node, nodeSchema, onUpdate }) => {
  if (_.isEmpty(node)) return null;
  if (_.isEmpty(nodeSchema)) return null;

  const nodeModel = instantiate(nodeSchema, { requiredOptionsOnly: false });

  const nodeProps = _.map(_.keys(nodeModel), (property, index) => (
    <NodeMapField
      nodeId={node.id}
      nodeProperty={property}
      onUpdate={onUpdate}
      key={index}
    />
  ));

  return (
    <fieldset>
      <legend>Node: {nodeSchema.title}</legend>
      {nodeProps}
    </fieldset>
  );
};

BluprintConfigBuilderItem.propTypes = propTypes;

export default BluprintConfigBuilderItem;
