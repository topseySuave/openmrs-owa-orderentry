import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shortid from 'shortid';

export class LabDraftOrder extends React.Component {
  constructor(props) {
    super(props);

    this.handleToggleDraftOrderUgency = this.handleToggleDraftOrderUgency.bind(this);
  }


  handleToggleDraftOrderUgency(order) {
    const orderId = order.id;
    let orderUrgency;
    if (order.urgency && order.urgency === 'routine') {
      orderUrgency = 'STAT';
    } else {
      orderUrgency = 'routine';
    }
    const draftOrder = {
      orderId,
      orderUrgency,
    };
    this.props.toggleDraftLabOrdersUgency(draftOrder);
  }

  renderDraftList = () => this.props.draftLabOrders.map((order) => {
    const iconClass = classNames({
      'icon-check': order.urgency === 'routine',
      'icon-exclamation-sign': order.urgency === 'STAT',
    });
    return (
      <li className="draft-list small-font" key={shortid.generate()}>
        <span>{order.test}</span>
        <span className="stay-right">
          <a className="action-btn" href="#" onClick={() => this.handleToggleDraftOrderUgency(order)}>
            <i className={iconClass} title="Urgency" />
          </a>
        </span>
      </li>);
  })
  render() {
    const { draftLabOrders, toggleDraftLabOrdersUgency } = this.props;
    const numberOfDraftOrders = draftLabOrders.length;
    const isDisabled = !numberOfDraftOrders;
    return (
      <div className="draft-spacing draft-lab-layout">
        <h5 className="h5-draft-header">
          Unsaved Draft Orders ({numberOfDraftOrders})
        </h5>
        <div className="table-container">
          <ul className="draft-list-container">
            {this.renderDraftList()}
          </ul>
        </div>
        <br />
        <input
          type="button"
          onClick={() => {}}
          className="button cancel modified-btn"
          value={numberOfDraftOrders > 1 ? "Discard All" : "Discard"}
          disabled={isDisabled}
        />
        <input
          type="submit"
          onClick={() => {}}
          className="button confirm right modified-btn"
          value="Sign and Save"
          disabled={isDisabled}
        />
      </div>
    );
  }
}

LabDraftOrder.propTypes = {
  draftLabOrders: PropTypes.arrayOf(PropTypes.any).isRequired,
  toggleDraftLabOrdersUgency: PropTypes.func.isRequired,
};

export default LabDraftOrder;
