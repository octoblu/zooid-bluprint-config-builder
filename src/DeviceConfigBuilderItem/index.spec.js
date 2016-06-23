import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { mount, shallow } from 'enzyme'

import DeviceConfigBuilderItem from './'

chai.use(chaiEnzyme())
chai.use(sinonChai)

describe.only('<DeviceConfigBuilderItem />', () => {
  describe('when given an element with no node', () => {
    it('should not render', () => {
      const nodeSchemaMapItem = {
        nodeId: 'nodeId',
        schemas: {
          message: {
            properties: {
              cats: { type: 'string' },
            },
          },
        },
      }
      const sut = shallow(<DeviceConfigBuilderItem nodeSchema={nodeSchemaMapItem} />)
      expect(sut).to.be.empty
    })
  })
  describe('when given an element with a node', () => {
    it('should render the config properties of that node message schema', () => {
      const nodeSchemaMapItem = {
        nodeId: 'nodeId',
        schemas: {
          message: {
            properties: {
              cats: { type: 'string' },
            },
          },
        },
      }
      const node = {
        
      }
      const sut = shallow(<DeviceConfigBuilderItem nodeSchema={nodeSchemaMapItem} node={})

    })
  })
})
