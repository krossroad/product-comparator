import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Form, Col, Button } from 'react-bootstrap';
import { isUri } from 'valid-url';
import { updateUrl, fetchProducts } from '../reducers/productComparator';
import Url from './Url';

class UrlForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const { firstUrl, secondUrl } = this.props;

    if (isUri(firstUrl) && isUri(secondUrl) && this.props.hasUrlChanged) {
      this.props.fetchProducts({ firstUrl, secondUrl });
    }
  }

  render() {
    return (
      <Row className="show-grid form-wrapper">
        <Col xs={12} md={9} mdOffset={1}>
          <Form horizontal onSubmit={this.handleSubmit}>
            <Url key="first" field="firstUrl"
              label="First" updateUrl={this.props.updateUrl}
              url={this.props.firstUrl} />

            <Url key="second" field="secondUrl"
              label="Second" updateUrl={this.props.updateUrl}
              url={this.props.secondUrl} />

            <Button bsStyle="success" type="submit">Search</Button>
          </Form>
        </Col>
      </Row>
    )
  }
}

export default connect(
  (state) => ({
    firstUrl: state.firstUrl,
    secondUrl: state.secondUrl,
    hasUrlChanged: state.hasUrlChanged
  }),
  { updateUrl, fetchProducts }
)(UrlForm)
