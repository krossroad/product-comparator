import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Image, Col}  from 'react-bootstrap';

class ProductMedia extends Component {
    render() {
        return  (
            <Row>
                <Col xs={12} md={4}>
                    <h3>Compare</h3>
                </Col>

                {this.props.products.map(product => 
                    <Col key={product.id} xs={6} md={4}>
                        <Image src={product.image} responsive />
                            <h3>{product.name}</h3>
                            <h4>{product.currencySymbol} {product.price}</h4>
                    </Col>
                )}
            </Row>
        )
    }
}

export default connect(
    (state) =>({products: state.products})
)(ProductMedia)
