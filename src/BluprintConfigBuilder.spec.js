import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import BluprintConfigBuilder from './';
import sampleFlow from '../test/data/sample-flow.json'
chai.use(chaiEnzyme());

describe('<BluprintConfigBuilder />', () => {
  it('should render nothing when flow prop is empty', () => {
    const sut = shallow(<BluprintConfigBuilder />)
    expect(sut).to.be.empty
  });

  it('should render nothing when given a flow that is an empty object', ()=>{
    const sut = shallow(<BluprintConfigBuilder flow={{}} />)
    expect(sut).to.be.empty
  })

  describe('when given a flow that is not empty', ()=>{
    it('should render the element', ()=>{
      const sut = shallow(<BluprintConfigBuilder flow={sampleFlow} />)
      expect(sut).to.not.be.blank
    })

  })
});
