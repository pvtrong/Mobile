import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Time } from '../commons/constants/time.js';
import { ModeTime } from '../commons/constants/mode-time.js';
import { ButtonDom } from './ButtonDom';

export default class Pomodoro extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shortBreak: Time.ShortBreak,
      longBreak: Time.LongBreak,
      pomodoro: Time.Pomodoro,
      longBreakInterval: Time.LongBreakInterval,
      interval: '',
      total: 1500,
      mode: ModeTime.Pomodoro,
      timer: 0,
      pause: true,
      modes: [
        {
          id: ModeTime.Pomodoro,
          name: 'Pomodoro',
          color: '#f194ff'
        },
        {
          id: ModeTime.ShortBreak,
          name: 'ShortBreak',
          color: '#ffc107'
        },
        {
          id: ModeTime.LongBreak,
          name: 'LongBreak',
          color: '#28a745'
        },
      ],
    };
    this.changeMode(ModeTime.Pomodoro);
    this.changeMode = this.changeMode.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  render() {
    let { timer, modes, mode } = this.state;
    let self = this;
    return (
      <View  style={styles.container}>
        <ButtonDom
          styless={{margin: 5}}
          action={this.startTimer}
          title={this.state.pause ? 'Start' : 'Pause'}
        />
        <Text style={styles.timer}>{timer}</Text>
        <View style={{...styles.container, flexDirection: 'row', margin: 10}}>
        {modes.map((x) => (
          <ButtonDom
            action={() => {
              self.changeMode(x.id);
            }}
            color={x.color}
            title={x.name}
            active={x.id === mode}
          />
        ))}
        </View>
      </View>
    );
  }

  /**
   * Thay đổi mode
   */
  changeMode(mode) {
    this.updateTotal(mode);
    clearInterval(this.state.interval);
    this.setState(() => {
      return {
        pause: true,
      };
    });
  }

  /**
   * update lại tổng số s còn lại
   */
  updateTotal(mode) {
    let total = 0;
    let self = this;
    console.log(mode);
    switch (mode) {
      case ModeTime.Pomodoro: {
        total = Time.Pomodoro * 60;
        break;
      }
      case ModeTime.LongBreak: {
        total = Time.LongBreak * 60;
        break;
      }
      case ModeTime.ShortBreak: {
        total = Time.ShortBreak * 60;
        break;
      }
    }
    self.setState(() => {
      return { total: total };
    });
    setTimeout(() => {
      self.updateClock();
    });
  }

  /**
   * xử lý sự kiện nút start/pause, khởi tạo interval
   */
  startTimer() {
    let self = this;
    let { pause, total } = this.state;
    self.setState((previousState, props) => {
      return {
        pause: !previousState.pause,
      };
    });
    if (total === 0) {
      this.changeMode(ModeTime.Pomodoro);
    }
    clearInterval(this.state.interval);
    let interval = setInterval(function () {
      self.updateClock();
      if (!self.state.pause)
        self.setState((previousState, props) => {
          return { total: previousState.total - 1 };
        });
      if (self.state.total <= 0) {
        clearInterval(interval);
      }
    }, 1000);
    self.setState(() => {
      return {
        interval: interval,
      };
    });
  }

  /**
   * update lại giao diện đồng hồ
   */
  updateClock() {
    let distance = this.state.total * 1000;
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    this.setState(() => {
      return {
        timer: minutes + 'm ' + seconds + 's ',
      };
    });
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#eee',
    height: '100%'
  },
  timer: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
  }
});
