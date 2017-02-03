'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _debouncePromise = require('debounce-promise');

var _debouncePromise2 = _interopRequireDefault(_debouncePromise);

var _cache = require('./cache');

var _cache2 = _interopRequireDefault(_cache);

var _TagBoxContainer = require('./TagBoxContainer');

var _TagBoxContainer2 = _interopRequireDefault(_TagBoxContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TagBoxAsync = function (_TagContainer) {
  _inherits(TagBoxAsync, _TagContainer);

  function TagBoxAsync() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TagBoxAsync);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TagBoxAsync.__proto__ || Object.getPrototypeOf(TagBoxAsync)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      tags: [],
      tag: '',
      considering: null,
      loading: false
    }, _this.cache = (0, _cache2.default)(), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TagBoxAsync, [{
    key: 'loader',
    value: function loader() {
      return (0, _debouncePromise2.default)(this.props.fetch, 500);
    }
  }, {
    key: 'tags',
    value: function tags() {
      return this.state.tags;
    }
  }, {
    key: 'loading',
    value: function loading() {
      return this.state.loading;
    }
  }, {
    key: 'tagUpdater',
    value: function tagUpdater() {
      var _this2 = this;

      return function (e) {
        var input = e.target.value;
        _this2.setState({ tag: input });

        var matches = _this2.cache.get(input);
        if (matches) {
          return _this2.setState({ tags: matches });
        }

        _this2.setState({ loading: true });
        var fetch = _this2.loader();
        return fetch(input).then(function (tags) {
          _this2.setState({
            tags: _this2.cache.add(input, tags),
            loading: false
          });
        });
      };
    }
  }]);

  return TagBoxAsync;
}(_TagBoxContainer2.default);

TagBoxAsync.propTypes = {
  fetch: _react.PropTypes.func.isRequired
};
exports.default = TagBoxAsync;