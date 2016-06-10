import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mount, shallow } from 'enzyme';

import NodeMapField from './';

chai.use(chaiEnzyme());
chai.use(sinonChai);

describe('<NodeMapField  />', () => {
  it('should render nothing when nodeId prop is empty', () => {
    const sut = shallow(<NodeMapField nodeProperty="fancy" />);
    expect(sut).to.be.empty;
  });

  it('should render nothing when nodeProperty prop is empty', () => {
    const sut = shallow(<NodeMapField nodeId="cool-gang" />);
    expect(sut).to.be.empty;
  });

  describe('when nodeId and propert props are valid', () => {
    let sut;

    beforeEach(() => {
      sut = shallow(<NodeMapField nodeId="Carter-IV" nodeProperty="cash-money" />);
    });

    it('should default showConfigProperty state to false', () => {
      expect(sut).to.have.state('showConfigProperty').equal(false);
    });

    it('should default configName state to an empty string', () => {
      expect(sut).to.have.state('configName').equal('');
    });

    it('should render nodeProperty label', () => {
      expect(sut).to.contain('cash-money');
    });

    it('should render a checkbox', () => {
      expect(sut.find("input[type='checkbox']").length).to.equal(1);
    });

    it('should set showConfigProperty state to true when checkbox is checked', () => {
      let checkbox = sut.find("input[type='checkbox']");
      checkbox.simulate('click');
      expect(sut).to.have.state('showConfigProperty').equal(true);
    });

    it('should render configName field if configure state is truthy', () => {
      sut.setState({ showConfigProperty: true });
      expect(sut.find('input[type="text"]').length).to.equal(1);
    });
  });

  describe('when configName is empty', () => {
    let sut;
    let nodeId = 'Nintendo-64';
    let nodeProperty = 'Playstation 1';
    let onUpdateHandler = sinon.stub();

    beforeEach(() => {
      sut = mount(<NodeMapField nodeId={nodeId} nodeProperty={nodeProperty} onUpdate={onUpdateHandler} />);
      sut.setState({
        showConfigProperty: true,
        configName: '',
      });
    });

    it('should not call onUpdate on blur', () => {
      sut.find('input[type="text"]').simulate('blur');
      expect(onUpdateHandler).to.not.have.been.called;
    });
  });
  
  describe('when configName is set', () => {
    let sut;
    let nodeId = 'Nintendo-64';
    let nodeProperty = 'Playstation 1';
    let onUpdateHandler = sinon.stub();

    beforeEach(() => {
      sut = mount(<NodeMapField nodeId={nodeId} nodeProperty={nodeProperty} onUpdate={onUpdateHandler} />);
      sut.setState({
        showConfigProperty: true,
        configName: 'myPayload',
      });
    });

    it('should call onUpdate on blur', () => {
      sut.find('input[type="text"]').simulate('blur');
      expect(onUpdateHandler).to.have.been.calledWith({ nodeId, nodeProperty, configureProperty: 'myPayload' });
    });
  });
});
