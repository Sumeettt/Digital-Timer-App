import {Component} from 'react'
import './index.css'

const initialState = {
  isTimerRunning: false,
  timeLimitInMinutes: 25,
  timeElapsedInSeconds: 0,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreasingTimerLimit = () => {
    this.setState(prevState => ({
      timeLimitInMinutes: prevState.timeLimitInMinutes - 1,
    }))
  }

  onIncreasingTimerLimit = () => {
    this.setState(prevState => ({
      timeLimitInMinutes: prevState.timeLimitInMinutes + 1,
    }))
  }

  incrementTimeElapsedInSeconds = () => {
    const {timeLimitInMinutes, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timeLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPause = () => {
    const {
      timeLimitInMinutes,
      timeElapsedInSeconds,
      isTimerRunning,
    } = this.state

    const isTimerCompleted = timeElapsedInSeconds === timeLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }

    if (isTimerRunning) {
      this.clearTimerInterval()
      // this.setState({isTimerRunning: false}) // Set isTimerRunning to false explicitly when pausing.
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
      // console.log(`${isTimerRunning} after else`)
      // this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning})) // Set isTimerRunning to true explicitly when starting.
    }

    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timeLimitInMinutes, timeElapsedInSeconds} = this.state

    const totalRemainingSeconds = timeLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  render() {
    const {
      isTimerRunning,
      timeLimitInMinutes,
      timeElapsedInSeconds,
    } = this.state

    console.log(`${isTimerRunning}  render`)
    const currentStatus = isTimerRunning ? 'Running' : 'Paused'

    const startPauseIcon = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startPauseAlt = isTimerRunning ? 'pause icon' : 'play icon'
    const startPauseText = isTimerRunning ? 'Pause' : 'Start'

    const isButtonDisables = timeElapsedInSeconds > 0

    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-and-controller-container">
          <div className="timer-container">
            <div className="timer-card">
              <h1 className="timer-text">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="status-text">{currentStatus}</p>
            </div>
          </div>
          <div className="control-container">
            <div className="control-buttons-container">
              <div className="start-pause-container">
                <button
                  className="control-buttons"
                  type="button"
                  onClick={this.onStartOrPause}
                >
                  <img
                    className="control-icons"
                    src={startPauseIcon}
                    alt={startPauseAlt}
                  />
                  <p className="button-text">{startPauseText}</p>
                </button>
              </div>
              <div className="reset-container">
                <button
                  className="control-buttons"
                  type="button"
                  onClick={this.onResetTimer}
                >
                  <img
                    className="control-icons"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                  />
                  <p className="button-text">Reset</p>
                </button>
              </div>
            </div>
            <p className="timer-limit-text">Set Timer limit</p>
            <div className="timer-limit-container">
              <button
                className="timer-limit-buttons"
                type="button"
                onClick={this.onDecreasingTimerLimit}
                disabled={isButtonDisables}
              >
                -
              </button>
              <div className="timer-limit-number-container">
                <p className="timer-limit-number">{timeLimitInMinutes}</p>
              </div>
              <button
                className="timer-limit-buttons"
                type="button"
                onClick={this.onIncreasingTimerLimit}
                disabled={isButtonDisables}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
