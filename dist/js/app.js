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
            var _this = this;
            this.$minusMinute.click(function () {
                if (!_this.isOn && _this.minutes > 0 && _this.minutes < 60) {
                    _this.degrees += 5.9;
                    _this.minutes -= 1;
                    _this.rotate(_this.degrees);
                    _this.setTimer(_this.minutes);
                }
            });
        }
    }, {
        key: 'start',
        value: function start() {
            var _this2 = this;

            var _this = this;
            this.$play.click(function () {
                if (!_this.isOn && _this.minutes > 0 && _this.minutes < 60) {
                    _this.hideAddSubButtons();
                    _this.activate();
                    _this.mseconds = _this.minutes * 60000;
                    _this.seconds = _this.minutes * 60;
                    _this.idIntervalSeconds = setInterval(function () {
                        _this.seconds--;
                        if (_this.seconds % 60 >= 10) {
                            _this2.$countdown.text(Math.floor(_this.seconds / 60) + ':' + _this.seconds % 60);
                        } else {
                            _this2.$countdown.text(Math.floor(_this.seconds / 60) + ':0' + _this.seconds % 60);
                        }
                        _this.degrees += 0.0983;
                        _this.rotate(_this.degrees);
                        _this.finish(_this.seconds, _this.idIntervalMinutes, _this.idIntervalSeconds);
                    }, 1000);
                    _this.idIntervalMinutes = setInterval(function () {
                        _this.minutes--;
                        _this.setTimer(_this.minutes);
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
            var _this = this;
            this.$stop.click(function () {
                if (_this.isOn) {
                    clearInterval(_this.idIntervalMinutes);
                    clearInterval(_this.idIntervalSeconds);
                    _this.restartValues();
                    _this.soundAlarm();
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