import React from 'react'
import { storiesOf } from '@kadira/storybook'

import BluprintConfigBuilder from '../src'
import DeviceSelector from '../src/DeviceSelector'
import sampleFlow from '../test/data/sample-flow.json'
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
      onUpdate={ghettoAction('BluprintConfigBuilder:onUpdate')}
    />
  ))

  .add('On Device Share', () => (
    <BluprintConfigBuilder
      nodes={sampleFlow.nodes}
      operationSchemas={operationSchemas}
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

storiesOf('DeviceSelector', module)
  .add('Basic', () => (
    <DeviceSelector
      category="device"
      type="device:hue"
      uuid="some-device-uuid"
      onUpdate={ghettoAction('DeviceSelector:onUpdate')}
    />
  ))

  .add('Not a device', () => (
    <DeviceSelector
      category="operation"
      type="operator:trigger"
      uuid="some-device-uuid"
      onUpdate={ghettoAction('DeviceSelector:onUpdate')}
    />
  ))
