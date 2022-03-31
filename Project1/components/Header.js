import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class Header extends React.Component {
  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>
          PODOMORO TIMER
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    fontWeight: 'bold',
    shadowOpacity: 1,
    elevation: 5,
    backgroundColor: '#ddd',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
  }
})