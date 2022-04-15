import { ThemeProvider } from 'react-native-elements';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Dimensions,
} from 'react-native';
import {
  Input,
  Button,
  Image,
  Text,
} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapViewDirections from 'react-native-maps-directions';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

class Tracking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 0,
      password: "",
      idErrorMsg: "",
      pwErrorMsg: "",
      renderIdError: false,
      renderPwError: false,
      clientLocation: {
        latitude: 3.123941,
        longitude: 101.723149,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
      },
      driverLocation: {
        latitude: 3.039839,
        longitude: 101.794297,
        latitudeDelta: 0.09,
        longitudeDelta: 0.04,
      }
    };
    this.mapRef = null;

  }

  componentWillUnmount() {
    this.setState({
      userId: 0,
      password: "",
      idErrorMsg: "",
      pwErrorMsg: "",
      renderIdError: false,
      renderPwError: false
    })
  }

  getLocation() {
    this.props.navigation.navigate('Location')
  }

  render() {

    // const mapRef = this.myRef.current

    return (

      <SafeAreaView style={{ flex: 1 }}>
        <MapView style={{ flex: 1 }}
          ref={(ref) => { this.mapRef = ref }}
          provider={PROVIDER_GOOGLE}
          region={this.state.clientLocation}
        >
          <MapViewDirections
            origin={this.state.clientLocation}
            destination={this.state.driverLocation}
            apikey={"AIzaSyC - VeSkqfZFn_9fPVDYvReCM - 230 - rhOrI"}
            strokeWidth={3}
            strokeColor="red"
            optimizeWaypoints={true}
            onReady={result => {
              this.mapRef.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: width / 20,
                  bottom: height / 20,
                  left: width / 20,
                  top: height / 20
                }
              })
            }}
          
          />
          <Marker
            coordinate={this.state.clientLocation}
            image={require("./img/user.png")}
          >
          </Marker>
          <Marker
            coordinate={this.state.driverLocation}
            image={require("./img/driver.png")}
          >
          </Marker>
        </MapView>
        <View style={styles.locationCard}>
          {/* <Text>Choose your Pickup Location</Text>
          <TouchableOpacity
            style={styles.inputStyle}
            onPress={()=> this.getLocation()}
          >
            <Text>Click To Choose</Text>

          </TouchableOpacity> */}

          <Text>Current Status: On Schedule</Text>
          <Text>Distance Left: 15.1 KM</Text>
          <Text>Time Left: 35 min</Text>

        </View>

      </SafeAreaView>
      

    );
  }

};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#181544'
  },
  titleTxt: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 25,
    color: 'brown',
    alignSelf: 'center',
    marginBottom: 30,
    paddingLeft: 20,
  },
  input: {
    paddingLeft: 20,
    paddingRight: 20
  },
  inputTxt: {
    fontFamily: 'Montserrat-Regular'
  },
  loginBtn: {
    marginTop: 50,
    borderRadius: 25,
    width: '100%',

  },
  loginBtnTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20
  },
  linearGradient: {
    opacity: 0.8
  },
  locationCard: {
    backgroundColor: 'white',
    width: '100%',
    padding: 30,
    borderTopEndRadius: 24,
    borderTopStartRadius:24
  },
  inputStyle: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    marginTop: 16
  },
});


export default Tracking;

