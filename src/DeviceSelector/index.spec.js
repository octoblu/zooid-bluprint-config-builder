import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { mount, shallow } from 'enzyme'
import Input from 'zooid-input'

import DeviceSelector from './'

chai.use(chaiEnzyme())
chai.use(sinonChai)

describe('<DeviceSelector />', () => {
  describe('When shareExisting device is falsy', () => {
    it('should render the configureName input', () => {
      const sut = shallow(<DeviceSelector nodeName="Cats" nodeId="meow" />)
      expect(sut.find(Input).length).to.equal(1)
    })
  })
})
