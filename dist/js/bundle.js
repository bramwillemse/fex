(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dialog = void 0;

var _bodyScroll = require("../utilities/body-scroll");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
DIALOG
------
Open a dialog with a static trigger
*/
var DIALOG_TRIGGER = 'data-dialog-trigger';
var DIALOG_CLOSE = 'data-dialog-close';
var ACTIVE_CLASS = 'is-active';

var Dialog = /*#__PURE__*/function () {
  function Dialog(_ref) {
    var triggerElement = _ref.triggerElement,
        dialogId = _ref.dialogId;

    _classCallCheck(this, Dialog);

    this.dialog = document.getElementById(dialogId);
    if (!this.dialog) return;
    this.triggerElement = triggerElement;
    this.closeButtons = _toConsumableArray(this.dialog.querySelectorAll("[".concat(DIALOG_CLOSE, "]")));
    this.focusableElements = _toConsumableArray(this.dialog.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]'));
    this.setupEventHandlers();
  }

  _createClass(Dialog, [{
    key: "setupEventHandlers",
    value: function setupEventHandlers() {
      var _this = this;

      if (this.triggerElement) {
        this.triggerElement.addEventListener('click', function (event) {
          event.preventDefault();
          _this.activeElementBeforeOpen = event.target;

          _this.open();
        });
      }

      this.closeButtons.forEach(function (button) {
        return button.addEventListener('click', function (event) {
          event.preventDefault();

          _this.close();
        });
      });
      this.dialog.addEventListener('keydown', function (event) {
        return _this.handleKeydown(event);
      }, true);
    }
  }, {
    key: "handleKeydown",
    value: function handleKeydown(event) {
      if (event.key === "Escape") this.close();
    }
  }, {
    key: "open",
    value: function open() {
      this.dialog.classList.add(ACTIVE_CLASS);
      this.focusableElements[0].focus();
      (0, _bodyScroll.disableBodyScroll)();
    }
  }, {
    key: "close",
    value: function close() {
      this.dialog.classList.remove(ACTIVE_CLASS);
      this.activeElementBeforeOpen.focus();
      (0, _bodyScroll.enableBodyScroll)();
    }
  }]);

  return Dialog;
}();

exports.Dialog = Dialog;
window.addEventListener('DOMContentLoaded', function () {
  var dialogTriggers = _toConsumableArray(document.querySelectorAll("[".concat(DIALOG_TRIGGER, "]")));

  dialogTriggers.forEach(function (element) {
    var dialogId = element.getAttribute('aria-controls');
    new Dialog({
      triggerElement: element,
      dialogId: dialogId
    });
  });
});

},{"../utilities/body-scroll":3}],2:[function(require,module,exports){
"use strict";

require('./dialog/dialog.js');

},{"./dialog/dialog.js":1}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enableBodyScroll = exports.disableBodyScroll = void 0;

var _offsets = require("./offsets");

var scrollTop = 0;

var disableBodyScroll = function disableBodyScroll() {
  scrollTop = (0, _offsets.getScrollTop)();
  document.body.style.top = "-".concat(scrollTop, "px");
  document.body.classList.add('u-body-scroll-lock');
};

exports.disableBodyScroll = disableBodyScroll;

var enableBodyScroll = function enableBodyScroll() {
  document.body.classList.remove('u-body-scroll-lock');
  document.body.style.top = '';
  window.scrollTo(0, scrollTop);
};

exports.enableBodyScroll = enableBodyScroll;

},{"./offsets":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getScrollTop = void 0;

var getScrollTop = function getScrollTop() {
  var htmlScrollTop = document.querySelector('html').scrollTop;
  var bodyScrollTop = document.body.scrollTop;
  return htmlScrollTop > bodyScrollTop ? htmlScrollTop : bodyScrollTop;
};

exports.getScrollTop = getScrollTop;

},{}]},{},[2]);
