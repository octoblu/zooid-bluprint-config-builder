import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import BluprintConfigBuilder from '../src';
import sampleFlow from '../test/data/sample-flow.json'
import fakeNodeSchemaMap from '../test/data/fake-node-schema-map.json'


storiesOf('BluprintConfigBuilder', module)
  .add('Basic', () => (
    <BluprintConfigBuilder
      flow={sampleFlow}
      nodeSchemaMap={fakeNodeSchemaMap}
      onUpdate={(result) => {
        console.log('Updated', result);
      }}
    />
  ))
  ;
