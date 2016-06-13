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
    const sut = shallow(<NodeMapField nodePropertySchema="fancy" />);
    expect(sut).to.be.empty;
  });

  it('should render nothing when nodePropertySchema prop is empty', () => {
    const sut = shallow(<NodeMapField nodeId="cool-gang" />);
    expect(sut).to.be.empty;
  });


  it('should render nothing when nodeProperty prop is empty', () => {
    const sut = shallow(<NodeMapField nodeId="cool-gang" nodePropertySchema="fancy" />);
    expect(sut).to.be.empty;
  });

  describe('when nodeId, nodePropertySchema & nodeProperty props are passed in', () => {
    let sut;

    beforeEach(() => {
      const nodeProperty = 'alias'
      const nodePropertySchema = {
        type: 'string',
        title: 'Alias',
      }

      sut = shallow(
        <NodeMapField
          nodeId="Carter-IV"
          nodePropertySchema={nodePropertySchema}
          nodeProperty={nodeProperty}
        />
      );
    });

    it('should default showConfigProperty state to false', () => {
      expect(sut).to.have.state('showConfigProperty').equal(false);
    });

    it('should default configName state to an empty string', () => {
      expect(sut).to.have.state('configName').equal('');
    });

    it('should render nodePropertySchema label', () => {
      expect(sut).to.contain('Alias');
    });

    it('should render a checkbox', () => {
      expect(sut.find("input[type='checkbox']").length).to.equal(1);
    });

    it('should set showConfigProperty state to true when checkbox is checked', () => {
      const checkbox = sut.find("input[type='checkbox']");
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
    let nodePropertySchema = {
      type: 'string',
      title: 'Payload',
    }
    let nodeProperty = 'payload'
    let onUpdateHandler = sinon.stub();

    beforeEach(() => {
      sut = mount(
        <NodeMapField
          nodeId={nodeId}
          nodePropertySchema={nodePropertySchema}
          nodeProperty={nodeProperty}
          onUpdate={onUpdateHandler}
        />
      )
      sut.setState({
        showConfigProperty: true,
        configName: '',
      });
    });

    it('should not call onUpdate onChange', () => {
      sut.find('input[type="text"]').simulate('change');
      expect(onUpdateHandler).to.not.have.been.called;
    });
  });

  describe('when configName is set', () => {
    let sut;
    let nodeId = 'Nintendo-64';
    let nodePropertySchema = {
      type: 'string',
      title: 'Payload Type',
    };
    let nodeProperty = 'payloadType'
    let onUpdateHandler = sinon.stub();

    beforeEach(() => {
      sut = mount(
        <NodeMapField
          nodeId={nodeId}
          nodePropertySchema={nodePropertySchema}
          nodeProperty={nodeProperty}
          onUpdate={onUpdateHandler}
        />
      )

      sut.setState({
        showConfigProperty: true,
        configName: 'myPayload',
      });
    });

    it('should call onUpdate onChange', () => {
      sut.find('input[type="text"]').simulate('change');
      expect(onUpdateHandler).to.have.been.calledWith({
        configureProperty: 'myPayload',
        nodeId,
        nodeProperty,
        type: 'string',
      });
    });
  });
});
