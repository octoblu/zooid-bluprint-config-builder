import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { shallow, mount } from 'enzyme'
import Input from 'zooid-input'

import DeviceSelector from './'

chai.use(chaiEnzyme())
chai.use(sinonChai)

describe('<DeviceSelector />', () => {
  describe('When shareExisting device is falsy', () => {
    it('should render the configureName input', () => {
      const sut = mount(<DeviceSelector nodeId="meow" />)
      expect(sut.find(Input).length).to.equal(1)
    })
  })

  describe('when shareExisting device is true', () => {
    it('should hide the input', () => {
      const sut = mount(
        <DeviceSelector
          nodeName="My Name"
          nodeId="node-id-stuff"
          shareDevice={true}
        />)
      expect(sut.find(Input).length).to.equal(0)
    })
  })
  describe('when we enter a configProperty name and onChange is fired', () => {

    xit('should call onUpdate', () => {
      const onUpdateHandler = sinon.spy()
      const sut = mount(
        <DeviceSelector
          onUpdate={onUpdateHandler}
          nodeId="node-id-stuff"
        />)

      sut.find(Input).simulate('change', {
        target: {
          value: 'SomePropertyName',
        },
      })

      expect(onUpdateHandler).to.have.been.called
    })
  })

})
