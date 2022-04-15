import { ThemeProvider } from 'react-native-elements';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import Home from './Home';
import Login from './Login';
import Booking from './Booking';
import ViewBookings from './ViewBookings';
import Tracking from './Tracking';
import ChooseLocation from './ChooseLocation';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

App = () => {

  createMainStack = () => 
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" children={createBottomTabs} />
      <Stack.Screen name="Location" component={ChooseLocation} />
      

    </Stack.Navigator>


  createBottomTabs = (props) => {
    return <Tab.Navigator>
      <Tab.Screen name="Booking" component={Booking} />
      <Tab.Screen name="ViewBookings" component={ViewBookings} />
      <Tab.Screen name="Tracking" component={Tracking} />
      
    </Tab.Navigator>
  }

  return (
    <NavigationContainer>
      {this.createMainStack()}
    </NavigationContainer>
  );
};

export default App;