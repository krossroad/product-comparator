import React, {Component} from 'react';
import {connect} from 'react-redux';
import ProductMedia from './ProductMedia';
import ProductDetail from './ProductDetail';
import {Grid}  from 'react-bootstrap';

class Product extends Component {
    render() {
        if (this.props.products.length < 1) {
            return null
        }
        
        return (
            <Grid className="form-wrapper">
                <ProductMedia />
                <ProductDetail />
            </Grid>
        )
    }
}

export default connect(
    (state) =>({products: state.products})
)(Product)
