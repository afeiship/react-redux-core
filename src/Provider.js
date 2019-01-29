import React from 'react';
import PropTypes from 'prop-types';
import nx from 'next-js-core2';

export default class extends React.Component {
  static childContextTypes = {
    store: PropTypes.object
  };

  getChildContext() {
    return { store: this.store };
  }

  constructor(props, context) {
    super(props, context);
    nx.$store = this.store = props.store;
  }

  render() {
    const { children } = this.props;
    return React.Children.only(children);
  }
}
