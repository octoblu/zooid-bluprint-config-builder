import React from 'react'
import { storiesOf } from '@kadira/storybook'

import BluprintConfigBuilder from '../src'
import DeviceSelector from '../src/DeviceSelector'
import sampleFlow from '../test/data/sample-flow.json'
import endoGithubFlow from '../test/data/endo-github-flow.json'
import fakeNodeSchemaMap from '../test/data/fake-node-schema-map.json'


function ghettoAction(label) {
  return function action(...args) {
    console.log(label, args)
  }
}

storiesOf('BluprintConfigBuilder', module)
  .add('Basic', () => (
    <BluprintConfigBuilder
      flow={sampleFlow}
      nodeSchemaMap={fakeNodeSchemaMap}
      onUpdate={ghettoAction('BluprintConfigBuilder:onUpdate')}
    />
  ))
  .add('Deep Properties', () => (
    <BluprintConfigBuilder
      flow={endoGithubFlow}
      onUpdate={ghettoAction('BluprintConfigBuilder:onUpdate')}
    />
  ))
  .add('On Device Share', () => (
    <BluprintConfigBuilder
      flow={sampleFlow}
      nodeSchemaMap={fakeNodeSchemaMap}
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
