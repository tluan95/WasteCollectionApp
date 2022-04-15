import { ThemeProvider } from 'react-native-elements';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import {
  Input,
  Button,
  Image,
  Text,
} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 0,
      password: "",
      idErrorMsg: "",
      pwErrorMsg: "",
      renderIdError: false,
      renderPwError: false
    };

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

  login() {

    if (this.state.userId == "") {
      this.setState({
        idErrorMsg: "Please enter your ID",
        renderIdError: true
      });
      return;
    }

    if (this.state.password == "") {
      this.setState({
        pwErrorMsg: "Please enter your password",
        renderPwError: true
      });
      return;
    }

    //change ip address accordinly
    fetch('http://192.168.50.180:3000/user/login', {
      method: 'POST',
      body: JSON.stringify({
        "userId": this.state.userId,
        "password": this.state.password
      }),
      headers: {
        'Content-Type': 'application/json ',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message == "login successful") {
          const user_name = json.username;
          const user_id = json.id;
          
          //this.props.navigation.navigate('Home', { isLoggedIn: true, username: user_name});
          this.props.navigation.navigate('Home', { params: { id: user_id, name: user_name }, screen: 'ViewBookings' })
          this.props.navigation.navigate('Home', { params: { id: user_id, name: user_name }, screen: 'Booking' })
        } else {
          alert("Login failed. Please try again.");
        }
      })
      .catch((error) => console.error(error))
  }

  render() {

    return (
      <ThemeProvider>
        <View style={{ flex: 1, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center' }}>
          <StatusBar barStyle="dark-content" />

          <Image
            source={require("./img/logo.png")}
            style={{ width: 180, height: 180, marginBottom: 20 }}
          />

          <Text style={styles.titleTxt}>Dry Waste Collector App </Text>
          <Input

            containerStyle={styles.input}
            inputStyle={styles.inputTxt}
            placeholder="Student/Staff ID"
            errorStyle={{ color: 'red' }}
            errorMessage={this.state.idErrorMsg}
            renderErrorMessage={this.state.renderIdError}
            onChangeText={value => this.setState({ userId: value })} />
          <Input
            containerStyle={styles.input}
            inputStyle={styles.inputTxt}
            placeholder="Password"
            secureTextEntry={true}
            errorStyle={{ color: 'red' }}
            errorMessage={this.state.pwErrorMsg}
            renderErrorMessage={this.state.renderPwError}
            onChangeText={value => this.setState({ password: value })} />
          <Button

            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: ['#655DCD', '#302A88', '#181544'],
              start: { x: 0, y: 0.5 },
              end: { x: 1, y: 0.5 }
            }}
            title="LOGIN"
            titleStyle={styles.loginBtnTitle}
            buttonStyle={styles.loginBtn}
            onPress={() => this.login()} />


        </View>
      </ThemeProvider>

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
});


export default Login;

