import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Form, FormGroup, Col, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { isUri } from 'valid-url';
import { updateUrl, fetchProducts } from '../reducers/productComparator';

class UrlForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const { firstUrl, secondUrl } = this.props;

    if (isUri(firstUrl) && isUri(secondUrl) && this.props.hasUrlChanged) {
      this.props.fetchProducts({ firstUrl, secondUrl });
    }
  }

  getUrlValidationState = (field) => {
    return isUri(this.props[field]) ? 'success' : 'error';
  }

  handleUrlChange = (e) => {
    let payload = {}

    payload[e.target.name] = e.target.value;

    this.props.updateUrl(payload);
  }

  render() {
    return (
      <Row className="show-grid form-wrapper">
        <Col xs={12} md={9} mdOffset={1}>
          <Form horizontal onSubmit={this.handleSubmit}>
            <FormGroup controlId="firstUrl"
              validationState={this.getUrlValidationState('firstUrl')}>
              <Col componentClass={ControlLabel} sm={3}>
                First Product
                            </Col>
              <Col sm={7}>
                <FormControl type="text"
                  name="firstUrl"
                  value={this.props.firstUrl}
                  required
                  onChange={this.handleUrlChange}
                  placeholder="First" />
                <FormControl.Feedback />
              </Col>
            </FormGroup>
            <FormGroup controlId="secondUrl"
              validationState={this.getUrlValidationState('secondUrl')}>
              <Col componentClass={ControlLabel} sm={3}>
                Second Product
                            </Col>
              <Col sm={7}>
                <FormControl type="text"
                  name="secondUrl"
                  onChange={this.handleUrlChange}
                  required
                  value={this.props.secondUrl}
                  placeholder="Second" />
                <FormControl.Feedback />
              </Col>
            </FormGroup>

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
