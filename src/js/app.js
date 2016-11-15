class PomodoroClock {
    constructor() {
        this.degrees = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.mseconds = 0;
        this.idIntervalMinutes = 0;
        this.idIntervalSeconds = 0;
        this.isOn = false;
        this.audio = new Audio('../src/mp3/alarm.mp3');
        this.$countdown = $(".countdown");
        this.$addMinute = $(".js-plus");
        this.$play = $(".js-play");
        this.$stop = $(".js-stop");
        this.$minusMinute = $(".js-minus");
        this.$tomato = $(".tomato");
    }
    setTimer(time) {
        this.$countdown.text(time + ":00");
    }
    activate() {
        this.isOn = true;
    }
    deactivate() {
        this.isOn = false;
    }
    addMinute() {
        let _this = this;
        this.$addMinute.click(() => {
            if ((!_this.isOn) && _this.minutes < 60) {
                _this.degrees -= 5.9;
                _this.minutes += 1;
                _this.rotate(_this.degrees);
                _this.setTimer(_this.minutes);
            }
        });
    }
    substractMinute() {
        let _this = this;
        this.$minusMinute.click(() => {
            if ((!_this.isOn) && _this.minutes > 0 && _this.minutes < 60) {
                _this.degrees += 5.9;
                _this.minutes -= 1;
                _this.rotate(_this.degrees);
                _this.setTimer(_this.minutes);
            }
        });
    }
    start() {
        let _this = this;
        this.$play.click(() => {
            if ((!_this.isOn) && _this.minutes > 0 && _this.minutes < 60) {
                _this.hideAddSubButtons();
                _this.activate();
                _this.mseconds = _this.minutes * 60000;
                _this.seconds = _this.minutes * 60;
                _this.idIntervalSeconds = setInterval(() => {
                    _this.seconds--;
                    if (_this.seconds % 60 >= 10) {
                        this.$countdown.text(Math.floor(_this.seconds / 60) + ":" + _this.seconds % 60);
                    } else {
                        this.$countdown.text(Math.floor(_this.seconds / 60) + ":0" + _this.seconds % 60);
                    }
                    _this.degrees += 0.0983;
                    _this.rotate(_this.degrees);
                    _this.finish(_this.seconds, _this.idIntervalMinutes, _this.idIntervalSeconds);
                }, 1000);
                _this.idIntervalMinutes = setInterval(() => {
                    _this.minutes--;
                    _this.setTimer(_this.minutes);
                }, 60000);
            }
        })
    }
    rotate(deg) {
        this.$tomato.css("-webkit-transform", "rotate(" + deg + "deg)");
        this.$tomato.css("-moz-transform", "rotate(" + deg + "deg)");
        this.$tomato.css("-ms-transform", "rotate(" + deg + "deg)");
        this.$tomato.css("-o-transform", "rotate(" + deg + "deg)");
        this.$tomato.css("transform", "rotate(" + deg + "deg)");
    }
    finish(sec, idIntMin, idIntSec) {
        if (sec === 0) {
            clearInterval(idIntMin);
            clearInterval(idIntSec);
            this.soundAlarm();
            this.restartValues();
        };
    }
    stop() {
        let _this = this;
        this.$stop.click(() => {
            if (_this.isOn) {
                clearInterval(_this.idIntervalMinutes);
                clearInterval(_this.idIntervalSeconds);
                _this.restartValues();
                _this.soundAlarm();
            }
        })
    }
    soundAlarm() {
        this.audio.play();
    }
    restartValues() {
        this.minutes = 0;
        this.seconds = 0;
        this.mseconds = 0;
        this.degrees = 0;
        this.rotate(this.degrees);
        this.hideAddSubButtons();
        this.deactivate();
        this.setTimer(this.minutes);
    }
    hideAddSubButtons() {
        !(this.isOn) ? $(".js-minus,.js-plus").fadeOut(): $(".js-minus,.js-plus").fadeIn()
    }
}

$(() => {
    let pomodoroClock = new PomodoroClock();
    pomodoroClock.addMinute();
    pomodoroClock.start();
    pomodoroClock.stop();
    pomodoroClock.substractMinute();
})