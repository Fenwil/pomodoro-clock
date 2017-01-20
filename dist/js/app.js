'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PomodoroClock = function () {
  function PomodoroClock() {
    _classCallCheck(this, PomodoroClock);

    this.degrees = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.mseconds = 0;
    this.idIntervalMinutes = 0;
    this.idIntervalSeconds = 0;
    this.isOn = false;
    this.$countdown = $('.countdown');
    this.$addMinute = $('.js-plus');
    this.$play = $('.js-play');
    this.$stop = $('.js-stop');
    this.$minusMinute = $('.js-minus');
    this.$tomato = $('.tomato');
  }

  _createClass(PomodoroClock, [{
    key: 'setTimer',
    value: function setTimer(time) {
      this.$countdown.text(time + ':00');
    }
  }, {
    key: 'activate',
    value: function activate() {
      this.isOn = true;
    }
  }, {
    key: 'deactivate',
    value: function deactivate() {
      this.isOn = false;
    }
  }, {
    key: 'addMinute',
    value: function addMinute() {
      var _this = this;

      this.$addMinute.click(function () {
        if (!_this.isOn && _this.minutes < 60) {
          _this.degrees -= 5.9;
          _this.minutes += 1;
          _this.rotate(_this.degrees);
          _this.setTimer(_this.minutes);
        }
      });
    }
  }, {
    key: 'substractMinute',
    value: function substractMinute() {
      var _this2 = this;

      this.$minusMinute.click(function () {
        if (!_this2.isOn && _this2.minutes > 0 && _this2.minutes < 60) {
          _this2.degrees += 5.9;
          _this2.minutes -= 1;
          _this2.rotate(_this2.degrees);
          _this2.setTimer(_this2.minutes);
        }
      });
    }
  }, {
    key: 'start',
    value: function start() {
      var _this3 = this;

      this.$play.click(function () {
        if (!_this3.isOn && _this3.minutes > 0 && _this3.minutes < 60) {
          _this3.hideAddSubButtons();
          _this3.activate();
          _this3.mseconds = _this3.minutes * 60000;
          _this3.seconds = _this3.minutes * 60;
          _this3.idIntervalSeconds = setInterval(function () {
            _this3.seconds--;
            if (_this3.seconds % 60 >= 10) {
              _this3.$countdown.text(Math.floor(_this3.seconds / 60) + ':' + _this3.seconds % 60);
            } else {
              _this3.$countdown.text(Math.floor(_this3.seconds / 60) + ':0' + _this3.seconds % 60);
            }
            _this3.degrees += 0.0983;
            _this3.rotate(_this3.degrees);
            _this3.finish(_this3.seconds, _this3.idIntervalMinutes, _this3.idIntervalSeconds);
          }, 1000);
          _this3.idIntervalMinutes = setInterval(function () {
            _this3.minutes--;
            _this3.setTimer(_this3.minutes);
          }, 60000);
        }
      });
    }
  }, {
    key: 'rotate',
    value: function rotate(deg) {
      this.$tomato.css('-webkit-transform', 'rotate(' + deg + 'deg)');
      this.$tomato.css('-moz-transform', 'rotate(' + deg + 'deg)');
      this.$tomato.css('-ms-transform', 'rotate(' + deg + 'deg)');
      this.$tomato.css('-o-transform', 'rotate(' + deg + 'deg)');
      this.$tomato.css('transform', 'rotate(' + deg + 'deg)');
    }
  }, {
    key: 'finish',
    value: function finish(sec, idIntMin, idIntSec) {
      if (sec === 0) {
        clearInterval(idIntMin);
        clearInterval(idIntSec);
        this.soundAlarm();
        this.restartValues();
      }
    }
  }, {
    key: 'stop',
    value: function stop() {
      var _this4 = this;

      this.$stop.click(function () {
        if (_this4.isOn) {
          clearInterval(_this4.idIntervalMinutes);
          clearInterval(_this4.idIntervalSeconds);
          _this4.restartValues();
          _this4.soundAlarm();
        }
      });
    }
  }, {
    key: 'soundAlarm',
    value: function soundAlarm() {
      $('audio').get(0).play();
    }
  }, {
    key: 'restartValues',
    value: function restartValues() {
      this.minutes = 0;
      this.seconds = 0;
      this.mseconds = 0;
      this.degrees = 0;
      this.rotate(this.degrees);
      this.hideAddSubButtons();
      this.deactivate();
      this.setTimer(this.minutes);
    }
  }, {
    key: 'hideAddSubButtons',
    value: function hideAddSubButtons() {
      !this.isOn ? $('.js-minus,.js-plus').fadeOut() : $('.js-minus,.js-plus').fadeIn();
    }
  }]);

  return PomodoroClock;
}();

$(function () {
  var pomodoroClock = new PomodoroClock();
  pomodoroClock.addMinute();
  pomodoroClock.start();
  pomodoroClock.stop();
  pomodoroClock.substractMinute();
});