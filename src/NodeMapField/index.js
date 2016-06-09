import _ from 'lodash'
import classNames from 'classnames'
import React, { PropTypes } from 'react'

const proptypes = {
  nodeId: PropTypes.string,
  property: PropTypes.string
}

class NodeMapField extends React.Component {
  constructor(props) {
    super(props)

    this.state  = {
      configure: false
    }

    this.updateConfigureState = this.updateConfigureState.bind(this)
  }


  updateConfigureState() {
    this.setState({
      configure: !this.state.configure
    })
  }

  render() {
    const { nodeId, property } = this.props;

    if (_.isEmpty(nodeId)) return null
    if (_.isEmpty(property)) return null

    const { configure } = this.state
    let configureInput = null;

    if (configure) configureInput = <input type="text" required />

    return (
      <div name={property}>
        <span>{property}</span>
        <input
          type="checkbox"
          name="configure"
          checked={configure}
          onClick={this.updateConfigureState}
        />
        {configureInput}
      </div>
    )
  }
}

NodeMapField.proptypes = proptypes

export default NodeMapField
