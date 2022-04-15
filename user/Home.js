import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Tracking from './Tracking';
import Booking from './Booking';
import ViewBookings from './ViewBookings';

const Tab = createBottomTabNavigator();

class Home extends Component {

    render() {
        console.log("Homeeeeeee");
        console.log(this.props);

        return (
            
            <SafeAreaProvider>
                {/* <Tab.Navigator
                    initialRouteName="Booking"
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;
                            if (route.name === "Booking") {
                                iconName = focused ? 'calendar' : 'md-calendar-sharp';
                            } else if (route.name === "Tracking") {
                                iconName = focused ? 'car-sport' : 'car-sport-sharp';
                            } 
                            else if (route.name === "ViewBookings") {
                                iconName = focused ? 'book-outline' : 'book-sharp';
                            } 
                            return focused ? <Ionicons name={iconName} size={size} color='#302A88' /> : <Ionicons name={iconName} size={size} color={color} />;
                        }
                    })}
                    tabBarOptions={{
                        labelStyle: {
                            fontFamily: 'Montserrat-Medium',
                            fontSize: 12
                        },
                        activeTintColor: 'green',
                        activeBackgroundColor: '#f0effa',
                        inactiveTintColor: '#000000'
                    }}
                >
                    <Tab.Screen name="Booking" component={Booking} />
                    <Tab.Screen name="Tracking" component={Tracking} />
                    <Tab.Screen name="ViewBookings" component={ViewBookings} />
                </Tab.Navigator> */}
            </SafeAreaProvider>
        );
    }

};

export default Home;
