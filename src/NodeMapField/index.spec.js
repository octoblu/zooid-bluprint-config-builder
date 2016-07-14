import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { mount, shallow } from 'enzyme'
import Switch from 'zooid-switch'
import Input from 'zooid-input'

import NodeMapField from './'


chai.use(chaiEnzyme())
chai.use(sinonChai)

describe('<NodeMapField  />', () => {
  describe('when component mounts', () => {
    let sut
    beforeEach(() => {
      sut = shallow(
        <NodeMapField
          nodeId=""
          nodePropertySchema={null}
          nodeProperty={null}
        />
      )
    })

    it('should have showConfigProperty state set to false', () => {
      expect(sut).to.have.state('showConfigProperty').equal(false)
    })

    it('should have configName state set to an empty string', () => {
      expect(sut).to.have.state('configName').equal('')
    })

    it('should have required state set to false', () => {
      expect(sut).to.have.state('required').equal(false)
    })

    it('should have description state set to an empty string', () => {
      expect(sut).to.have.state('description').equal('')
    })
  })

  it('should render nothing when nodeId prop is empty', () => {
    const sut = shallow(<NodeMapField nodePropertySchema="fancy" />)
    expect(sut).to.be.empty
  })

  it('should render nothing when nodePropertySchema prop is empty', () => {
    const sut = shallow(<NodeMapField nodeId="cool-gang" />)
    expect(sut).to.be.empty
  })

  it('should render nothing when nodeProperty prop is empty', () => {
    const sut = shallow(<NodeMapField nodeId="cool-gang" nodePropertySchema="fancy" />)
    expect(sut).to.be.empty
  })

  describe('when nodeId, nodePropertySchema & nodeProperty props are passed in', () => {
    let sut

    beforeEach(() => {
      const nodeProperty = 'alias'
      const nodePropertySchema = {
        type: 'string',
        title: 'Alias',
      }

      sut = mount(
        <NodeMapField
          nodeId="Carter-IV"
          nodePropertySchema={nodePropertySchema}
          nodeProperty={nodeProperty}
        />
      )
    })

    it('should render the showConfigProperty Switch', () => {
      expect(sut.find(Switch).length).to.equal(1)
    })

    it('should render a Switch with the nodePropertySchema label', () => {
      expect(sut.find(Switch).first()).to.have.prop('label', 'Alias')
    })

    it('should set showConfigProperty state to true when checkbox is checked', () => {
      const checkbox = sut.find(Switch).first()
      checkbox.simulate('click')
      expect(sut).to.have.state('showConfigProperty').equal(true)
    })
  })

  describe('when showConfigProperty state is truthy', () => {
    let sut

    beforeEach(() => {
      const nodeProperty = 'alias'
      const nodePropertySchema = {
        type: 'string',
        title: 'Alias',
      }

      sut = mount(
        <NodeMapField
          nodeId="Carter-IV"
          nodePropertySchema={nodePropertySchema}
          nodeProperty={nodeProperty}
        />
      )

      sut.setState({ showConfigProperty: true })
    })

    it('should render configName and description input fields', () => {
      expect(sut.find(Input).length).to.equal(2)
    })

    it('should render requiredField form field', () => {
      expect(sut.find('input[name="requiredField"]').length).to.equal(1)
      expect(sut.find('input[name="requiredField"]').length).to.equal(1)
      expect(sut.find('input[name="requiredField"]')).to.not.be.checked()
    })

    it('should set required state to true when requiredField input is checked', () => {
      const requiredFieldInput = sut.find('input[name="requiredField"]')
      requiredFieldInput.simulate('change', { target: { checked: true } })
      expect(sut).to.have.state('required').equal(true)
    })

    it('should set required state to false when requiredField input is not checked', () => {
      const requiredFieldInput = sut.find('input[name="requiredField"]')
      requiredFieldInput.simulate('change', { target: { checked: false } })
      expect(sut).to.have.state('required').equal(false)
    })

    it('should update the description state when the description text area changes', () => {
      const descriptionArea = sut.find('textarea')
      descriptionArea.simulate('change', { target: { value: 'cats' } })
      expect(sut).to.have.state('description').equal('cats')
    })
  })

  describe('when configName is empty', () => {
    let sut
    let nodeId = 'Nintendo-64'
    let nodePropertySchema = {
      type: 'string',
      title: 'Payload',
    }
    let nodeProperty = 'payload'
    let onUpdateHandler = sinon.stub()

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
      })
    })

    it('should not call onUpdate onChange', () => {
      sut.find(Input).first().simulate('change')
      expect(onUpdateHandler).to.not.have.been.called
    })
  })

  describe('when configName is set', () => {
    let sut
    let nodeId = 'Nintendo-64'
    let nodePropertySchema = {
      type: 'string',
      title: 'Payload Type',
    }
    let nodeProperty = 'payloadType'
    let onUpdateHandler = sinon.stub()

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
      })
    })

    it('should call onUpdate on change with correct args', () => {
      const descriptionArea = sut.find('textarea')
      descriptionArea.simulate('change', { target: { value: '' } })
      expect(onUpdateHandler).to.have.been.calledWith({
        configureProperty: 'myPayload',
        nodeId,
        required: false,
        nodeProperty,
        description: '',
        type: 'string',
        enabled: true
      })
    })
  })

  describe('when configName is set, required is true, and description is set', () => {
    let sut
    let nodeId = 'Nintendo-64'
    let nodePropertySchema = {
      type: 'string',
      title: 'Payload Type',
    }
    let nodeProperty = 'payloadType'
    let onUpdateHandler = sinon.stub()

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
        configName: 'myPayload',
        required: true,
        description: 'cats',
        showConfigProperty: true,
      })
    })

    it('should call onUpdate on change with correct args', () => {
      const descriptionArea = sut.find('textarea')
      descriptionArea.simulate('change', { target: { value: 'cats' } })
      expect(onUpdateHandler).to.have.been.calledWith({
        nodeId,
        nodeProperty,
        description: 'cats',
        configureProperty: 'myPayload',
        required: true,
        type: 'string',
        enabled: true
      })
    })
  })
})
