import React, { PropTypes } from 'react'
import _ from 'lodash'

const propTypes = {
  nodeId: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
  nodeName: PropTypes.string.isRequired,
  onUpdate: PropTypes.func,
}
const defaultProps = {
  onUpdate: _.noop,
}

class DeviceSelector extends React.Component {
  state = {
    useExisting: false,
  }

  componentDidUpdate() {
    const { useExisting } = this.state
    const { onUpdate, uuid, nodeId, category, nodeName } = this.props

    if (category !== 'device') return null
    onUpdate({
      shareDevice: useExisting,
      uuid,
      nodeId,
      nodeName
    })
  }

  useExistingDevice = ({ target }) => {
    this.setState({ useExisting: target.checked })
  }

  render() {
    const { useExisting } = this.state
    const { uuid } = this.props

    if (this.props.category !== 'device') return null

    return (
      <div>
        <label htmlFor="useExisting">Share existing device?</label>
        <input
          type="checkbox"
          name="useExistingDevice"
          checked={useExisting}
          onChange={this.useExistingDevice}
        />
        {useExisting && <a>{uuid}</a>}
      </div>
    )
  }
}

DeviceSelector.propTypes = propTypes
DeviceSelector.defaultProps = defaultProps

export default DeviceSelector
