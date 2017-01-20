class PomodoroClock {
  constructor () {
    this.degrees = 0
    this.minutes = 0
    this.seconds = 0
    this.mseconds = 0
    this.idIntervalMinutes = 0
    this.idIntervalSeconds = 0
    this.isOn = false
    this.$countdown = $('.countdown')
    this.$addMinute = $('.js-plus')
    this.$play = $('.js-play')
    this.$stop = $('.js-stop')
    this.$minusMinute = $('.js-minus')
    this.$tomato = $('.tomato')
  }
  setTimer (time) {
    this.$countdown.text(time + ':00')
  }
  activate () {
    this.isOn = true
  }
  deactivate () {
    this.isOn = false
  }
  addMinute () {
    this.$addMinute.click(() => {
      if ((!this.isOn) && this.minutes < 60) {
        this.degrees -= 5.9
        this.minutes += 1
        this.rotate(this.degrees)
        this.setTimer(this.minutes)
      }
    })
  }
  substractMinute () {
    this.$minusMinute.click(() => {
      if ((!this.isOn) && this.minutes > 0 && this.minutes < 60) {
        this.degrees += 5.9
        this.minutes -= 1
        this.rotate(this.degrees)
        this.setTimer(this.minutes)
      }
    })
  }
  start () {
    this.$play.click(() => {
      if ((!this.isOn) && this.minutes > 0 && this.minutes < 60) {
        this.hideAddSubButtons()
        this.activate()
        this.mseconds = this.minutes * 60000
        this.seconds = this.minutes * 60
        this.idIntervalSeconds = setInterval(() => {
          this.seconds--
          if (this.seconds % 60 >= 10) {
              this.$countdown.text(Math.floor(this.seconds / 60) + ':' + this.seconds % 60)
            } else {
              this.$countdown.text(Math.floor(this.seconds / 60) + ':0' + this.seconds % 60)
            }
          this.degrees += 0.0983
          this.rotate(this.degrees)
          this.finish(this.seconds, this.idIntervalMinutes, this.idIntervalSeconds)
        }, 1000)
        this.idIntervalMinutes = setInterval(() => {
          this.minutes--
          this.setTimer(this.minutes)
        }, 60000)
      }
    })
  }
  rotate (deg) {
    this.$tomato.css('-webkit-transform', 'rotate(' + deg + 'deg)')
    this.$tomato.css('-moz-transform', 'rotate(' + deg + 'deg)')
    this.$tomato.css('-ms-transform', 'rotate(' + deg + 'deg)')
    this.$tomato.css('-o-transform', 'rotate(' + deg + 'deg)')
    this.$tomato.css('transform', 'rotate(' + deg + 'deg)')
  }
  finish (sec, idIntMin, idIntSec) {
    if (sec === 0) {
      clearInterval(idIntMin)
      clearInterval(idIntSec)
      this.soundAlarm()
      this.restartValues()
    }
  }
  stop () {
    this.$stop.click(() => {
      if (this.isOn) {
        clearInterval(this.idIntervalMinutes)
        clearInterval(this.idIntervalSeconds)
        this.restartValues()
        this.soundAlarm()
      }
    })
  }
  soundAlarm () {
    $('audio').get(0).play()
  }
  restartValues () {
    this.minutes = 0
    this.seconds = 0
    this.mseconds = 0
    this.degrees = 0
    this.rotate(this.degrees)
    this.hideAddSubButtons()
    this.deactivate()
    this.setTimer(this.minutes)
  }
  hideAddSubButtons () {
    !(this.isOn) ? $('.js-minus,.js-plus').fadeOut() : $('.js-minus,.js-plus').fadeIn()
  }
}

$(() => {
  let pomodoroClock = new PomodoroClock()
  pomodoroClock.addMinute()
  pomodoroClock.start()
  pomodoroClock.stop()
  pomodoroClock.substractMinute()
})
