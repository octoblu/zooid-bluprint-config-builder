import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { shallow } from 'enzyme'
import Input from 'zooid-input'

import DeviceSelector from './'

chai.use(chaiEnzyme())
chai.use(sinonChai)

describe('<DeviceSelector />', () => {
  describe('When shareExisting device is falsy', () => {
    it('should render the configureName input', () => {
      const sut = shallow(<DeviceSelector nodeName="Cats" nodeId="meow" category="device" />)
      expect(sut.find(Input).length).to.equal(1)
    })
  })
  describe('when shareExisting device is true', () => {
    it('should hide the input', () => {
      const sut = shallow(
        <DeviceSelector
          nodeName="My Name"
          category="device"
          nodeId="node-id-stuff"
        />)
      sut.setState({ shareExistingDevice: true })
      expect(sut.find(Input).length).to.equal(0)
    })
  })
  describe('when we enter a configProperty name and onChange is fired', () => {

    it('should call onUpdate', () => {
      const onUpdateHandler = sinon.spy()
      const sut = shallow(
        <DeviceSelector
          onUpdate={onUpdateHandler}
          uuid="123456a"
          nodeName="My Name"
          category="device"
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
