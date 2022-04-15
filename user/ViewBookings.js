import { ThemeProvider } from 'react-native-elements';
import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  FlatList
} from 'react-native';
import {
  Header,
  Text,
  Icon,
  ListItem,
  Button,
} from 'react-native-elements';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaProvider } from 'react-native-safe-area-context';

class ViewBookings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookings: {},
            selectedBooking: 1,
            isDisabled: false,
            
        };
    }

    componentDidMount() {


        fetch('http://192.168.50.180:3000/showBookings', {
            method: 'POST',
            body: JSON.stringify({
                "userID": this.props.route.params.id,
            }),
            headers: {
                'Content-Type': 'application/json ',
            },
        })
            
            .then((response) => response.json())
            .then((json) => this.setState({ bookings: json }))
            .catch((error) => console.error(error))

    }

    myButtonDisable(status) {
        if (status== 'C') {
            return false;
        }
        if (status == 'P') {
            return true;
        }
        if (status == 'E') {
            return true;

        }
    }
    
    getStatus = (t) => {
        if (t == 'C') {
            return 'Comfirm Booking';
        }
        if (t == 'P') {
            return 'Pending Booking';
        }
        if (t == 'E') {
            return 'End Booking';
        }

    }

    keyExtractor = (item, index) => index.toString();

    renderItem = ({ item }) => (

        <ListItem
            bottomDivider
            underlayColor='#BDBAEA'
            containerStyle={{ minHeight: 65 }}

        // onPress={() => this.props.navigation.navigate('BookingInfo', { 
        //     bookingID: item.bookingID, 
        //     pickupDate: item.pickupDate, 
        //     pickupTime: item.pickupTime,
        //     location: item.location,  
        //     status: item.status 
        // })}
        >
            <ListItem.Content>
                <ListItem.Title style={{ marginLeft: 10, fontSize: 16 }}>
                    Booking ID{"\t"}{"\t"}{"\t"}: #{item.bookingID} {"\n"}
                    PickUp Date{"\t"}{"\t"}: {moment(item.pickupDate).format('YYYY-MM-DD') }  {"\n"}
                    PickUp Time{"\t"}{"\t"}: {item.pickupTime} {"\n"}
                    Location{"\t"}{"\t"}{"\t"}{"\t"}{"\t"}: {item.location} {"\n"}
                    {"\n"}
                    Item{"\t"}{"\t"}{"\t"}{"\t"}{"\t"}{"\t"}{"\t"}{"\t"}{"\t"}: {item.itemName} {"\n"}
                    Item Weight{"\t"}{"\t"}: {item.itemWeight}kg {"\n"}
                    Status{"\t"}{"\t"}{"\t"}{"\t"}{"\t"}{"\t"}{"\t"}: {this.getStatus(item.status)}
                    {"\n"}

                    
                </ListItem.Title>
                <Button
                    ViewComponent={LinearGradient}
                    linearGradientProps={{
                        colors: ['#655DCD', '#302A88', '#181544'],
                        start: { x: 0, y: 0.5 },
                        end: { x: 1, y: 0.5 }
                    }}

                    title="Tracking"

                    titleStyle={styles.submitBtnTitle}
                    buttonStyle={styles.submitBtn}
                    // disabled={[
                    //     (this.getdisable(item.status) == 1) ? false : null,
                    //     (this.getdisable(item.status) == 2) ? true : null,


                    // false]}
                    disabled={this.myButtonDisable(item.status)}
                    onPress={() => this.props.navigation.navigate('Tracking')} />
            </ListItem.Content>
            <ListItem.Chevron style={{ marginLeft: 10 }} />
        </ListItem>
    )



    render() {

        return (
            <ThemeProvider>
                <SafeAreaProvider>
                    <View style={styles.container}>
                        <StatusBar barStyle="dark-content" />
                        <Header
                            containerStyle={styles.header}
                            backgroundColor='#FFFFFF'
                            placement="left"
                            centerComponent={<View><Text style={styles.headerTxt}>Dry Waste Collector Booking List</Text></View>}
                            rightComponent={<Icon name='logout' onPress={() => this.props.navigation.navigate('Login')} />}
                        />
                        <FlatList
                            testID="bookingData"
                            keyExtractor={this.keyExtractor}
                            data={this.state.bookings}
                            renderItem={this.renderItem}
                        />

                    </View>
                </SafeAreaProvider>
            </ThemeProvider>

        );
    }

};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9'

    },
    header: {
        shadowColor: "#000000",
        shadowOpacity: 1,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        },
        elevation: 5
    },
    headerTxt: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 16
    },
    headerSubtitleTxt: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 12
    },
    submitBtn: {
        marginTop: 20,
        borderRadius: 15,
        width: '70%',
        margin: 30,
        alignContent: 'center',
    },
    submitBtnTitle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 15
    },

});

export default ViewBookings;

