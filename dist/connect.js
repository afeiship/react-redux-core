'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = connect;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nextJsCore = require('next-js-core2');

var _nextJsCore2 = _interopRequireDefault(_nextJsCore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function connect() {
  var args = _nextJsCore2.default.slice(arguments);
  return function wrapWithConnect(WrappedComponent) {
    var _class, _temp;

    var Connect = (_temp = _class = function (_React$Component) {
      _inherits(Connect, _React$Component);

      function Connect(props, context) {
        _classCallCheck(this, Connect);

        var _this = _possibleConstructorReturn(this, (Connect.__proto__ || Object.getPrototypeOf(Connect)).call(this, props, context));

        _this.store = context.store;
        _this.state = { storeState: null };
        return _this;
      }

      _createClass(Connect, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          this.trySubscribe();
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this.tryUnsubscribe();
        }
      }, {
        key: 'trySubscribe',
        value: function trySubscribe() {
          var _this2 = this;

          this.storeRes = this.store.subscribe(function () {
            _this2.handleChange();
          });
          this.handleChange();
        }
      }, {
        key: 'tryUnsubscribe',
        value: function tryUnsubscribe() {
          if (this.unsubscribe) {
            this.storeRes.destroy();
            this.unsubscribe = null;
          }
        }
      }, {
        key: 'handleChange',
        value: function handleChange() {
          if (this.unsubscribe) {
            this.setState({
              storeState: this.store.getState()
            });
          }
        }
      }, {
        key: 'mapStateToProps',
        value: function mapStateToProps() {
          var storeState = this.state.storeState;

          if (args.length > 0) {
            var targetProps = {};
            args.forEach(function (path) {
              var state = _nextJsCore2.default.get(storeState, path);
              _nextJsCore2.default.set(targetProps, path, state);
            });
            return targetProps;
          }
          return storeState;
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(WrappedComponent, this.mapStateToProps());
        }
      }]);

      return Connect;
    }(_react2.default.Component), _class.contextTypes = {
      store: _propTypes2.default.object
    }, _temp);

    return Connect;
  };
}