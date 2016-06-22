import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { mount, shallow } from 'enzyme'

import DeviceSelector from './'

chai.use(chaiEnzyme())
chai.use(sinonChai)

describe('<DeviceSelector />', () => {
  it('should render nothing', () => {
    const sut = shallow(<DeviceSelector />)
    expect(sut).to.be.empty
  })
})