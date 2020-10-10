import React, { Component } from 'react';
import {View} from 'react-native';
import CarAvailable from '../components/CarAvailable';
import Footer from '../components/Footer';
import {CAR_AVAILABLE_LIST_NAV} from '../constants';
import {setActiveScreen} from '../actions';
import {connect} from 'react-redux';

class CarAvailableScreen extends Component {
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.onFocusFunction();
    })
  }

  componentWillUnmount () {
    this.focusListener.remove();
  }

  onFocusFunction = () => {
    this.props.setActiveScreen(CAR_AVAILABLE_LIST_NAV);
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <CarAvailable />
        <Footer />
      </View>
      );
  }
}
export default connect(null, {setActiveScreen})(CarAvailableScreen);