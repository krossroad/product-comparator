import React, { Component } from 'react';
import { FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap';
import { isUri } from 'valid-url';


class Url extends Component {
  getUrlValidationState = () => {
    return isUri(this.props.url) ? 'success' : 'error';
  }

  handleUrlChange = (e) => {
    let payload = {};

    payload[this.props.field] = e.target.value;

    this.props.updateUrl(payload);
  }

  render() {
    return (
      <FormGroup controlId={this.field}
        validationState={this.getUrlValidationState()}>
        <Col componentClass={ControlLabel} sm={3}>
          {this.props.label} Product
        </Col>

        <Col sm={7}>
          <FormControl type="text"
            value={this.props.url}
            required
            onChange={this.handleUrlChange}
            placeholder={this.props.label} />
          <FormControl.Feedback />
        </Col>
      </FormGroup>
    )
  }
}

export default Url;
