import React, {Component} from 'react';
import {Row, Col}  from 'react-bootstrap';
import {connect} from 'react-redux';

class ProductAttribute extends Component {
    render() {
        const attributeName = this.props.products[0].common[this.props.field].name;

        return (
            <Row className="show-grid border-container">
                <Col xs={6} md={4}>
                    <h4>{attributeName}</h4>
                </Col>

                {this.props.products.map(product => 
                    <Col key={product.id + this.props.field} xs={6} md={4} className="border-left">
                        {product.common[this.props.field].value}
                    </Col>
                )}
            </Row>
        )
    }
}

export default connect(
    (state) => (state)
)(ProductAttribute);
