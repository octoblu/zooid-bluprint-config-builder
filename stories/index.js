import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import BluprintConfigBuilder from '../src';
import sampleFlow from '../test/data/sample-flow.json'
import schemaRegistry from '../test/data/schema-registry.json'


storiesOf('BluprintConfigBuilder', module)
  .add('Basic', () => (
    <BluprintConfigBuilder flow={sampleFlow} nodeSchemas={schemaRegistry}/>
  ));
