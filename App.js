import React , {Component} from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Router from './src/router/Router';
import 'react-native-gesture-handler';


class App extends Component {
  state = { }
  render() {
    console.disableYellowBox = true;
    return <Router /> }
}

const styles = StyleSheet.create({
  container:{
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    backgroundColor: '#ddd'
  },
  spacing: {marginTop : 10},
  topSpace: {marginLeft : 10},
  leftspace: {paddingLeft: 10}
});

export default App;


