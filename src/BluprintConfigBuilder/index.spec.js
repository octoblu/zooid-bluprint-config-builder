import _ from 'lodash';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mount, shallow } from 'enzyme';

import BluprintConfigBuilder from './';
import BluprintConfigBuilderItem from '../BluprintConfigBuilderItem';

import sampleFlow from '../../test/data/sample-flow.json';
import fakeNodeSchemaMap from '../../test/data/fake-node-schema-map.json';

chai.use(chaiEnzyme());
chai.use(sinonChai);

describe('<BluprintConfigBuilder />', () => {
  it('should render nothing when flow prop is not passed', () => {
    const sut = shallow(<BluprintConfigBuilder />);
    expect(sut).to.be.empty;
  });

  it('should render nothing when given a flow that is an empty object', () => {
    const sut = shallow(<BluprintConfigBuilder flow={{}} />);
    expect(sut).to.be.empty;
  });

  it('should render nothing when nodeSchemaMap prop is not passed in', () => {
    const sut = shallow(<BluprintConfigBuilder flow={sampleFlow} />);
    expect(sut).to.be.empty;
  });

  describe('when given a flow with nodes', () => {
    it('should render the element', () => {
      const sut = shallow(
        <BluprintConfigBuilder
          flow={sampleFlow}
          nodeSchemaMap={fakeNodeSchemaMap}
        />
      );
      expect(sut).to.not.be.blank;
    });

    it('should render BluprintConfigBuilderItem for each node in the flow', () => {
      const sut = mount(
        <BluprintConfigBuilder
          flow={sampleFlow}
          nodeSchemaMap={fakeNodeSchemaMap}
          onUpdate={_.noop}
        />);

      _.forEach(sampleFlow.nodes, (node) => {
        const nodeSchemaMapItem = _.find(fakeNodeSchemaMap, {uuid: node.uuid})
        let nodeSchema
        if (nodeSchemaMapItem.category === 'device') {
          nodeSchema = nodeSchemaMapItem.schemas.message
        } else {
          nodeSchema = nodeSchemaMapItem.schema
        }

        expect(sut).to.contain(
          <BluprintConfigBuilderItem
            node={node}
            nodeSchema={nodeSchema}
            onUpdate={sut.instance().handleUpdate}
            key={node.id}
          />
        )
      });
    })
  })

  describe('when handleUpdate() is called with a config ', () => {
    let config
    let handleUpdate
    let sut

    beforeEach(() => {
      config = {
        configureProperty: 'asd',
        nodeId: 'ff1123a0',
        nodeProperty: 'key',
        type: 'string',
      }

      handleUpdate = sinon.stub()
      sut = mount(
        <BluprintConfigBuilder
          flow={sampleFlow}
          nodeSchemaMap={fakeNodeSchemaMap}
          onUpdate={handleUpdate}
        />
      )
      sut.instance().handleUpdate(config)
    })

    it('should call onUpdate', () => {
      expect(handleUpdate).to.have.been.calledWith([config])
    })

    it('should add config to configList state if it does not exist', () => {
      expect(sut.state('configList')).to.deep.equal([config])
    })

    it('should not allow duplicate config with identical nodeId & nodeProperty in configList State', () => {
      expect(sut.state('configList').length).to.equal(1)
      sut.instance().handleUpdate({ ...config, configureProperty: 'moistness' })

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
