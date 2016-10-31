$(function () {

    var deg = 0,
        min = 0,
        sec = 0,
        ms = 0,
        idIntervalMinutes = 0,
        idIntervalSeconds = 0,
        isOn = false,
        audio = new Audio('./mp3/alarm.mp3');

    function setTimer(time) {
        $(".countdown").text(time + ":00");
    }

    function activate() {
        isOn = true;
    }

    function deactivate() {
        isOn = false;
    }

    function addMinute() {
        $(".js-plus").click(function () {
            if ((!isOn) && min < 60) {
                deg -= 5.9;
                min += 1;
                rotate(deg);
                setTimer(min);
            }
        });
    }

    function substractMinute() {
        $(".js-minus").click(function () {
            if ((!isOn) && min > 0 && min < 60) {
                deg += 5.9;
                min -= 1;
                rotate(deg);
                setTimer(min);
            }
        });
    }

    function start() {
        $(".js-play").click(function () {
            if ((!isOn) && min > 0 && min < 60) {
                hideAddSubButtons();
                activate();
                ms = min * 60000;
                sec = min * 60;
                idIntervalSeconds = setInterval(function () {
                    sec--;
                    console.log(sec)
                    if (sec % 60 >= 10) {
                        $(".countdown").text(Math.floor(sec / 60) + ":" + sec % 60);
                    } else {
                        $(".countdown").text(Math.floor(sec / 60) + ":0" + sec % 60);
                    }
                    deg += 0.0983;
                    rotate(deg);
                    finish(sec, idIntervalMinutes, idIntervalSeconds);
                }, 1000);
                idIntervalMinutes = setInterval(function () {
                    min--;
                    setTimer(min);
                }, 60000);
            }
        })
    }

    function rotate(deg) {
        $(".tomato").css("-webkit-transform", "rotate(" + deg + "deg)");
        $(".tomato").css("-moz-transform", "rotate(" + deg + "deg)");
        $(".tomato").css("-ms-transform", "rotate(" + deg + "deg)");
        $(".tomato").css("-o-transform", "rotate(" + deg + "deg)");
        $(".tomato").css("transform", "rotate(" + deg + "deg)");
    }

    function finish(sec, idIntMin, idIntSec) {
        if (sec === 0) {
            clearInterval(idIntMin);
            clearInterval(idIntSec);
            soundAlarm();
            restartValues();
        };
    }

    function stop() {
        $(".js-stop").click(function () {
            if (isOn) {
                clearInterval(idIntervalMinutes);
                clearInterval(idIntervalSeconds);
                restartValues();
                soundAlarm();
            }
        })
    };

    function soundAlarm() {
        audio.play();
    }

    function restartValues() {
        min = 0;
        sec = 0;
        ms = 0;
        deg = 0;
        rotate(deg);
        hideAddSubButtons();
        deactivate();
        setTimer(min);
    }

    function hideAddSubButtons() {
        !(isOn) ? $(".js-minus,.js-plus").hide(): $(".js-minus,.js-plus").show()
    }

    addMinute();
    start();
    stop();
    substractMinute();

});