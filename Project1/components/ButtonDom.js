import  React from 'react' 
import {StyleSheet, Button} from 'react-native'


export class ButtonDom extends React.Component {
  render() {
    return (
      <Button
        onPress={this.props.action}
        title={this.props.title}
        color={ this.props.color }
        style={styles.primary}
      />
    )
  }
}

const styles = StyleSheet.create({
  primary: {
    width: '5',
    borderRadius: '50%',
    color: 'red'
  }
})