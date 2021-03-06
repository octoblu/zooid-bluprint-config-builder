import _ from 'lodash'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { mount, shallow } from 'enzyme'

import BluprintConfigBuilder from './'
import BluprintConfigBuilderItem from '../BluprintConfigBuilderItem'

import sampleFlow from '../../test/data/sample-flow.json'
import operationSchemas from '../../test/data/tool-schema-registry.json'
import deviceSchemas from '../../test/data/device-schema-registry.json'

chai.use(chaiEnzyme())
chai.use(sinonChai)

describe('<BluprintConfigBuilder />', () => {
  it('should render nothing when flow prop is not passed', () => {
    const sut = shallow(<BluprintConfigBuilder />)
    expect(sut).to.be.empty
  })

  it('should render nothing when given a flow that is an empty object', () => {
    const sut = shallow(<BluprintConfigBuilder nodes={[]} />)
    expect(sut).to.be.empty
  })

  describe('when given nodes', () => {
    it('should render the element', () => {
      const sut = shallow(
        <BluprintConfigBuilder
          nodes={sampleFlow.nodes}
          operationSchemas={operationSchemas}
          deviceSchemas={deviceSchemas}
        />
      )

      expect(sut).to.not.be.blank
    })
  })

  describe('when handleUpdate() is called with a config ', () => {
    let config
    let handleUpdate
    let sut
    const configSchema = {
      type: 'object',
      properties: {
        options: {    
          type: 'object',
          properties: {
            asd: {
              type: 'string',
              'x-node-map': [
                {
                  id: 'ff1123a0',
                  property: 'key',
                },
              ],
            },
          },
        },
      },
    }
    beforeEach(() => {
      config = {
        configureProperty: 'asd',
        nodeId: 'ff1123a0',
        nodeProperty: 'key',
        type: 'string',
        enabled: true
      }

      handleUpdate = sinon.stub()
      sut = mount(
        <BluprintConfigBuilder
          nodes={sampleFlow.nodes}
          operationSchemas={operationSchemas}
          deviceSchemas={deviceSchemas}
          onUpdate={handleUpdate}
        />
      )
      sut.instance().handleUpdate(config)
    })

    it('should call onUpdate', () => {
      expect(handleUpdate).to.have.been.calledWith({configSchema, sharedDevices: []})
    })

    it('should not allow duplicate config with identical nodeId & nodeProperty in configList State', () => {
      expect(sut.state('configList').length).to.equal(1)
      sut.instance().handleUpdate({ ...config, configureProperty: 'moistness', enabled: true })

      expect(sut.state('configList').length).to.equal(1)
      expect(sut.state('configList')).to.deep.equal([{
        configureProperty: 'moistness',
        nodeId: 'ff1123a0',
        nodeProperty: 'key',
        type: 'string',
      }])
    })
  })
})
