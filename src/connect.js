import React from 'react';
import PropTypes from 'prop-types';
import nx from 'next-js-core2';

export default function connect() {
  const args = nx.slice(arguments);
  return function wrapWithConnect(WrappedComponent) {
    class Connect extends React.Component {
      static contextTypes = {
        store: PropTypes.object
      };

      constructor(props, context) {
        super(props, context);
        this.store = context.store;
        this.state = { storeState: null };
      }

      componentDidMount() {
        this.trySubscribe();
      }

      componentWillUnmount() {
        this.tryUnsubscribe();
      }

      trySubscribe() {
        this.storeRes = this.store.subscribe(() => {
          this.handleChange();
        });
        this.handleChange();
      }

      tryUnsubscribe() {
        if (this.unsubscribe) {
          this.storeRes.destroy();
          this.unsubscribe = null;
        }
      }

      handleChange() {
        if (this.unsubscribe) {
          this.setState({
            storeState: this.store.getState()
          });
        }
      }
      mapStateToProps() {
        const { storeState } = this.state;
        if (args.length > 0) {
          const targetProps = {};
          args.forEach((path) => {
            const state = nx.get(storeState, path);
            nx.set(targetProps, path, state);
          });
          return targetProps;
        }
        return storeState;
      }
      render() {
        return <WrappedComponent {...this.mapStateToProps()} />;
      }
    }
    return Connect;
  };
}
