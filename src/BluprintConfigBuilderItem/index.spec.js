import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import sinon from 'sinon'
import { shallow, mount } from 'enzyme'

import BluprintConfigBuilderItem from './'
import NodeMapField from '../NodeMapField'

import sampleFlow from '../../test/data/sample-flow.json'

chai.use(chaiEnzyme())

describe('<BluprintConfigBuilderItem />', () => {
  it('should render nothing when node prop is empty', () => {
    const sut = shallow(<BluprintConfigBuilderItem />)
    expect(sut).to.be.empty
  })

  it('should render nothing when given a node that is an empty object', () => {
    const sut = shallow(<BluprintConfigBuilderItem node={{}} />)
    expect(sut).to.be.empty
  })

  describe('when given valid node & nodeSchema', () => {
    let nodeSchema
    let node
    let sut
    let onUpdate

    beforeEach(() => {
      nodeSchema = {
        title: 'Trigger',
        type: 'object',
        properties: {
          alias: {
            type: 'string',
            title: 'Alias',
          },
          payloadType: {
            type: 'string',
            title: 'Payload Type',
            enum: [
              'date',
              'none',
              'string',
            ],
          },
          payload: {
            type: 'string',
            title: 'Payload',
          },
        },
      }
      node = sampleFlow.nodes[0]
      onUpdate = sinon.spy()
      sut = mount(
        <BluprintConfigBuilderItem
          node={node}
          nodeSchema={nodeSchema}
          onUpdate={onUpdate}
        />
      )
    })

    it('should render NodeMapFields for each property', () => {
      expect(sut).to.contain(
        <NodeMapField
          nodeId={node.id}
          nodeProperty="alias"
          nodePropertySchema={nodeSchema.properties.alias}
          onUpdate={onUpdate}
        />
      )

      expect(sut).to.contain(
        <NodeMapField
          nodeId={node.id}
          nodeProperty="payload"
          nodePropertySchema={nodeSchema.properties.payload}
          onUpdate={onUpdate}
        />
      )

      expect(sut).to.contain(
        <NodeMapField
          nodeId={node.id}
          nodeProperty="payloadType"
          nodePropertySchema={nodeSchema.properties.payloadType}
          onUpdate={onUpdate}
        />
      )
    })
  })
})
