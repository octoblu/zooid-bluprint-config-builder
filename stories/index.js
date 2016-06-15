import React from 'react';
import { storiesOf } from '@kadira/storybook';

import BluprintConfigBuilder from '../src';
import sampleFlow from '../test/data/sample-flow.json'
import fakeNodeSchemaMap from '../test/data/fake-node-schema-map.json'


storiesOf('BluprintConfigBuilder', module)
  .add('Basic', () => (
    <BluprintConfigBuilder
      flow={sampleFlow}
      nodeSchemaMap={fakeNodeSchemaMap}
      onUpdate={(result) => {
      }}
    />
  ))
  ;
