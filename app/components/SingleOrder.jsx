import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Row, Col } from 'react-bootstrap'
import OrderTotal from './OrderTotal'

export default connect(
  (state, ownProps) => {
    return {
      selectedOrder: state.orders.selectedOrder
    }
  }
)(class extends React.Component {

  render () {
    const order = this.props.selectedOrder;
    const shippingCost = order.shippingCost
    const totalPrice = order.totalPrice;

    const locale = "en-us"
    const options = {year: 'numeric', month: 'long', day: 'numeric'}
    const orderDate = new Date(order.created_at)

    const lineItems = order.lineItems.map(item =>
      <div key={item.id}>
        <Row>
          <Col md={2}>
            <Link to={`/products/${item.product_id}`}>
            <img className="img-responsive" src={item.product.imgUrl} />
            </Link>
          </Col>
          <Col md={6}>
            <Link to={`/products/${item.product_id}`}>
              {item.product.name}
            </Link>
              <div className="mini-stars">
                { `★`.repeat(item.product.averageRating) }
                { `☆`.repeat(5-item.product.averageRating) }
              </div>
              <br />
              Qty {item.quantity}
          </Col>
          <Col md={4} className="text-right">
          ${item.orderedPrice.toFixed(2)}
          </Col>
        </Row>
        <hr />
      </div>
    )


    return (
      <div className="order-padding">
        <Row>
          <Col md={6}>
            <h4>Ordered Date: {orderDate.toLocaleString(locale, options)}</h4>
            <h2>Order No: #{order.id}</h2>
          </Col>
          <Col md={6} className="text-right">
            <h4><span style={{letterSpacing: '1.9px', fontWeight: 'bold'}}>TOTAL:</span> ${totalPrice.toFixed(2)}</h4>
          </Col>
        </Row>
        <hr />

        { lineItems }

        <Row>
          <Col md={7} />

          <Col md={5} style={{padding: 0}}>
            <OrderTotal
              subtotal={totalPrice - shippingCost}
              shipping={shippingCost}
              total={totalPrice}
              margin="10px"
            />
          </Col>
        </Row>

        <hr />

        <Row>
          <Col md={6}>
          <span className="bold-text">SHIPPING ADDRESS:</span>
          <br />
           <p style={{margin: 0}}>{order.name}</p>
          {order.shippingAddress.split("\n").map((line, i) => <p style={{margin: 0}} key={i}>{line}</p>)}
          </Col>
          <Col md={6}>
          <span className="bold-text">SHIPPING METHOD:</span>
          <br />
          {order.shippingMethod}
          </Col>
        </Row>

      </div>
    );
}
})




