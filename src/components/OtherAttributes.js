import React, { Component } from 'react';

class OtherAttributes extends Component {
  render() {
    const { meta } = this.props.product;

    return (
      <dl className="dl-horizontal">
        {Object.values(meta).reduce((acc, attr) => {
          return acc.concat([
            <dt key={'dt' + attr.name}>{attr.name} :</dt>,
            <dd key={'dd' + attr.name}>{attr.value}</dd>
          ]);
        }, [])}
      </dl>
    )
  }
}

export default OtherAttributes
