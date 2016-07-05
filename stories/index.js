import React from 'react'
import { storiesOf } from '@kadira/storybook'

import BluprintConfigBuilder from '../src'
import DeviceSelector from '../src/DeviceSelector'
import sampleFlow from '../test/data/sample-flow.json'
import composeFlow from '../test/data/compose-flow.json'

import githubSampleFlow from '../test/data/sample-flow-github.json'

import operationSchemas from '../test/data/tool-schema-registry.json'
import deviceSchemas from '../test/data/device-schema-registry.json'

function ghettoAction(label) {
  return function action(...args) {
    console.log(label, args)
  }
}

storiesOf('BluprintConfigBuilder', module)
  .add('Basic', () => (
    <BluprintConfigBuilder
      nodes={sampleFlow.nodes}
      operationSchemas={operationSchemas}
      deviceSchemas={deviceSchemas}
      onUpdate={ghettoAction('BluprintConfigBuilder:onUpdate')}
    />
  ))

  .add('Compose Node', () => (
    <BluprintConfigBuilder
      nodes={composeFlow.nodes}
      operationSchemas={operationSchemas}
      deviceSchemas={deviceSchemas}
      onUpdate={ghettoAction('BluprintConfigBuilder:onUpdate')}
    />
  ))


  .add('On Device Share', () => (
    <BluprintConfigBuilder
      nodes={sampleFlow.nodes}
      operationSchemas={operationSchemas}
      deviceSchemas={deviceSchemas}
      onUpdate={ghettoAction('BluprintConfigBuilder:onUpdate')}
      onShareDevice={ghettoAction('BluprintConfigBuilder:onShareDevice')}
    />
  ))
  .add('Flow with endo node', ()=> (
    <BluprintConfigBuilder
      nodes={githubSampleFlow.nodes}
      operationSchemas={operationSchemas}
      deviceSchemas={deviceSchemas}
      onUpdate={ghettoAction('BluprintConfigBuilder:onUpdate')}
      onShareDevice={ghettoAction('BluprintConfigBuilder:onShareDevice')}
    />
  ))
