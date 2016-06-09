import _ from 'lodash';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import NodeMapField from './'

chai.use(chaiEnzyme());

describe('<NodeMapField  />', () => {

//   "nodeId": "hue1",
//   "nodeProperty": "transition.time",
//   "configProperty": "wakeupColor"
// }
  it('should render nothing when nodeId prop is empty', () => {
    const sut = shallow(<NodeMapField property="fancy" />)
    expect(sut).to.be.empty
  });

  it('should render nothing when property prop is empty', () => {
    const sut = shallow(<NodeMapField nodeId="cool-gang" />)
    expect(sut).to.be.empty
  });

  describe('when nodeId and propert props are valid', () => {
    let sut

    beforeEach(() => {
      sut = shallow(<NodeMapField nodeId="Carter-IV" property="cash-money" />)
    })

    it('should render property label', () => {
      expect(sut).to.contain('cash-money')
    })

    it('should render a checkbox', () => {
      expect(sut.find("input[type='checkbox']").length).to.equal(1)
    })

    it('should set configure state to true when checkbox is checked', () => {
      let checkbox = sut.find("input[type='checkbox']");
      checkbox.simulate('click')
      expect(sut).to.have.state('configure').equal(true)
    })

    it('should render configureProperty field if configure state is truthy', () => {
      sut.setState({configure: true})
      expect(sut).to.contain(<input type="text" required />)
    })
  })
});
