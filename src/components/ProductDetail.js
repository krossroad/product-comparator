import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import ProductAttribute from './ProductAttribute';
import OtherAttributes from './OtherAttributes';

class ProductDetail extends Component {
  render() {
    return (
      <Grid>
        <Row className="show-grid border-container">
          <Col xs={6} md={4}>
            <h4>Ratings</h4>
          </Col>

          {this.props.products.map(product =>
            <Col key={product.id} xs={6} md={4} className="border-left">
              <h4>{product.ratings}</h4>
            </Col>
          )}
        </Row>
        <Row className="show-grid border-container">
          <Col xs={6} md={4}>
            <h4>Description</h4>
          </Col>

          {this.props.products.map(product =>
            <Col key={product.id} xs={6} md={4} className="border-left">
              {product.description}
            </Col>
          )}
        </Row>

        {this.props.commonKeys.map((key) => {
          return key
            ? (<ProductAttribute key={key} field={key} />)
            : null;
        })}

        <Row className="show-grid border-container">
          <Col xs={6} md={4}>
            <h4>Others</h4>
          </Col>

          {this.props.products.map(product =>
            <Col key={product.id} xs={6} md={4} className="border-left">
              <OtherAttributes key={'other' + product.id} product={product} />
            </Col>
          )}
        </Row>
      </Grid>
    )
  }
}

export default connect(
  (state) => ({ products: state.products, commonKeys: state.commonKeys })
)(ProductDetail)
