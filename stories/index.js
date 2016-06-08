import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import BluprintConfigBuilder from '../src';

storiesOf('BluprintConfigBuilder', module)
  .add('Basic', () => (
    <BluprintConfigBuilder/>
  ));
