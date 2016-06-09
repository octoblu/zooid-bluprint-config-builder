import _ from 'lodash';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import BluprintConfigBuilder from './';
import BluprintConfigBuilderItem from '../BluprintConfigBuilderItem'

import sampleFlow from '../../test/data/sample-flow.json'
import schemaRegistry from '../../test/data/schema-registry.json'

chai.use(chaiEnzyme());

describe('<BluprintConfigBuilder />', () => {
  it('should render nothing when flow prop is not passed', () => {
    const sut = shallow(<BluprintConfigBuilder />)
    expect(sut).to.be.empty
  });

  it('should render nothing when given a flow that is an empty object', ()=>{
    const sut = shallow(<BluprintConfigBuilder flow={{}} />)
    expect(sut).to.be.empty
  })

  it('should render nothing when schemaRegistry prop is not passed in', () => {
    const sut = shallow(<BluprintConfigBuilder flow={sampleFlow} />)
    expect(sut).to.be.empty
  });

  describe('when given a flow with nodes', ()=>{
    it('should render the element', ()=>{
      const sut = shallow(<BluprintConfigBuilder flow={sampleFlow} nodeSchemas={schemaRegistry} />)
      expect(sut).to.not.be.blank
    })

    it('should render BluprintConfigBuilderItem for each node in the flow', () =>{
      const sut = mount(<BluprintConfigBuilder flow={sampleFlow} nodeSchemas={schemaRegistry}/>)

      _.map(sampleFlow.nodes, (node) => {
        const nodeSchema = schemaRegistry[node.class]
        expect(sut).to.contain(
          <BluprintConfigBuilderItem
            node={node}
            nodeSchema={nodeSchema}
            key={node.id} />
        )
      })
    })
  })
});
