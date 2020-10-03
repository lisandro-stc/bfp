import React, { Component } from 'react';
import { BackHandler} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './store/index';
import {MAIN_COLOR, RAMP_ADD_CAR_NAV} from './constants';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RampAddCarScreen from './screens/RampAddCarScreen';
import CarAvailableScreen from './screens/CarAvailableScreen';
import ValidationHistoryListScreen from './screens/ValidationHistoryListScreen';

export default class App extends Component {

  render() {
    
    const navOption = {
      headerShown: false,
    };

    const navOptionWithHeader = (title) => ({
      title: title,
      headerTintColor: 'white',
      headerStyle: {backgroundColor: MAIN_COLOR}
    });
    
    const MainNavigation = createStackNavigator({
      Login: { 
        screen: LoginScreen, 
        navigationOptions: navOption,
      },
      Home: {
        screen: HomeScreen,
        navigationOptions: { ...navOption, headerLeft: ()=>{}}
      },

      RampAddCar: {
        screen: RampAddCarScreen,
        navigationOptions: { ...navOption, headerLeft: ()=>{}}
      },

      CarAvailable: {
        screen: CarAvailableScreen,
        navigationOptions: { ...navOption, headerLeft: ()=>{}}
      },

      ValidationHistoryList: {
        screen: ValidationHistoryListScreen,
        navigationOptions: { ...navOption, headerLeft: ()=>{}}
      },
    });
  
    const AppContainer = createAppContainer(MainNavigation);

    return (
      <Provider store={store} >
          <AppContainer />
      </Provider>
    );
  }
}