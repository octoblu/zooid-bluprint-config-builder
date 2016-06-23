import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import sinonChai from 'sinon-chai'
import { shallow } from 'enzyme'
import Input from 'zooid-input'

import DeviceSelector from './'

chai.use(chaiEnzyme())
chai.use(sinonChai)

describe.only('<DeviceSelector />', () => {
  describe('When the category property is undefined', ()=>{
    it('should be empty', ()=>{
      const sut = shallow(<DeviceSelector nodeName="Cats" nodeId="meow"/>)
      expect(sut).to.be.empty
    })
  })
  describe('when the category is anything other than \'device\' ', ( ) => {
    it('should be empty', () => {
      const sut = shallow(<DeviceSelector nodeName="Cats" nodeId="meow" category="octobots"/>)
      expect(sut).to.be.empty
    })
  })
  describe('When shareExisting device is falsy', () => {
    it('should render the configureName input', () => {
      const sut = shallow(<DeviceSelector nodeName="Cats" nodeId="meow" category="device"/>)
      expect(sut.find(Input).length).to.equal(1)
    })
  })
  describe('when shareExisting device is true', () => {
    it('should hide the input', () => {
      const sut = shallow(<DeviceSelector nodeName="My Name" category="device" nodeId="node-id-stuff" />)
      sut.setState({shareExistingDevice: true})
      expect(sut.find(Input).length).to.equal(0)
    })
  })

})
