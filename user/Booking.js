import React, { Component} from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    Text,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import {
    Input,
    Button,
    Image,
    Icon,
    FlatList,
    ThemeProvider,
} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import RadioButton from './components/RadioButton';
/*import SearchLocation from './components/SearchLocation';*/

class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: 0,
            date: new Date(),
            dateTxt: new Date(),
            location: '',
            latitude: '',
            longitude: '',
            time: 'Unknown', setTime: '',
            bookStatus: 'n',
            vehicleType: 'Unknown', setVehicle: ' ',
            item: ' ',
            weight: ' ',

        };

    }
    componentWillUnmount() {
        this.setState({
            userId: 0,
            date: '', isDatePickerVisible: false,
            location: '',
            longitude: '',
            latitude: '',
            time: 'Unknown', setTime: '',
            bookStatus: 'n',
            vehicleType: 'Unknown', setVehicle: ' ',
            item: ' ',
            weight: ' ',
        })
    }

    updateTime = (time) => {
        this.setState({ time: time })
    }

    updateVehicle = (vehicleType) => {
        this.setState({ vehicleType: vehicleType })
    }

    createBooking() {

        const user_id = this.props.route.params.id;
        const sqlDate = moment(this.state.startDate).format('YYYY-MM-DD')
        const vehicle = this.state.vehicleType
        console.log(user_id);
        console.log(sqlDate);
        console.log(this.state.vehicleType);
        console.log(this.state.longitude);
        console.log(this.state.latitude);

        if (this.state.userId == 0) {
            this.setState({
                userId: user_id
            });
            return;
        }

        // if (this.state.longitude == "" || this.state.latitude == "") {
        //     this.setState({
        //         idErrorMsg: "Please enter your pick up location",
        //         renderIdError: true
        //     });
        //     return;
        // }

        if (this.state.item == "") {
            this.setState({
                pwErrorMsg: "Please enter your item name",
                renderPwError: true
            });
            return;
        }

        if (this.state.weight == "") {
            this.setState({
                pwErrorMsg: "Please enter your item weight",
                renderPwError: true
            });
            return;
        }

        fetch('http://192.168.50.180:3000/bookings', {
            method: 'POST',
            body: JSON.stringify({
                "location": "somewhere",
                "latitude": this.state.latitude,
                "longitude": this.state.longitude,
                "pickupDate": sqlDate,
                "pickupTime": this.state.time,
                "itemName": this.state.item,
                "itemWeight": this.state.weight,
                "vehicleType": vehicle,
                "userID": this.state.userId,
                "status": "New booking"

            }),
            headers: {
                'Content-Type': 'application/json ',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                this.props.navigation.navigate('ViewBookings', { params: { id: user_id } })
            })
            .catch((error) => console.error(error))
        
    }



    render() {

        const { vehicleType } = this.state;

        return (
            <ThemeProvider>
                <View style={{ backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center' }}>
                    <StatusBar barStyle="dark-content" />

                </View>

                <View style={styles.radioButton}>

                    <ScrollView keyboardShouldPersistTaps="handled">

                        <Text style={styles.label}>Hello {this.props.route.params.name }</Text>

                        <Text style={styles.label}>{'\n'}Pickup Location:{'\n'+ this.state.location}</Text>

                        {/* <Input

                            containerStyle={styles.input}
                            inputStyle={styles.inputTxt}
                            placeholder="Location"
                            onChangeText={value => this.setState({ location: value })} />
                             */}
                        
                        <GooglePlacesAutocomplete

                            placeholder='Enter Pickup Location'
                            styles={{
                                // textInputContainer: styles.containerStyle,
                                // textInput: styles.textInputStyle
                            }}
                            minLength={2}
                            onPress={(data, details = null) => {
                                // 'details' is provided when fetchDetails = true
                                const lat = details.geometry.location.lat
                                const lng = details.geometry.location.lng
                                console.log("lattitude", lat)
                                console.log("longttitude", lng)
                                this.setState({latitude: lat, longitude: lng})
                            }}
                            fetchDetails={true}
                            query={{
                                key: "AIzaSyC-VeSkqfZFn_9fPVDYvReCM-230-rhOrI",
                                language: 'en',
                            }}
                            onFail={error => console.error(error)}

                        />

                        <Text style={styles.label}>Pickup Date </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={styles.dateInput}>
                                <Text style={{ paddingLeft: 18, paddingRight: 18, color: '#302A88', fontFamily: 'Montserrat-Regular' }}>{moment(this.state.date).format('DD-MM-YYYY')}</Text>
                                <Icon
                                    name='calendar'
                                    type='antdesign'
                                    size={16}
                                    iconStyle={{ margin: 10 }}
                                    onPress={() => this.setState({ show: true })}
                                />
                            </View>
                        </View>

                        {this.state.show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={this.state.date}
                                mode="date"
                                onChange={(event, value) => {
                                    this.setState({ show: false });
                                    if (event.type == "set") {
                                        this.setState({
                                            date: value,
                                            dateTxt: moment(value).format('DD-MM-YYYY'),
                                        });
                                    }
                                }}
                            />
                        )}

                        

                        <Text style={styles.label}>{'\n'}Pickup Time: {this.state.time} </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={styles.screen}>
                                <Picker
                                    selectedValue={this.state.time}
                                    onValueChange={this.updateTime}
                                    mode="dropdown" // Android only
                                    style={styles.picker}
                                >
                                    <Picker.Item label="Please select time slot" value="Unknown" />
                                    <Picker.Item label="9am - 11am" value="9am-11am" />
                                    <Picker.Item label="12pm - 2pm" value="12pm-2pm" />
                                    <Picker.Item label="2pm - 4pm" value="2pm-4pm" />
                                    <Picker.Item label="4pm - 6pm" value="4pm-6pm" />
                                </Picker>

                            </View>
                        </View>

                        <Text style={styles.label}>{'\n'}Name of Dry Waste</Text>
                        <Input

                            containerStyle={styles.input}
                            inputStyle={styles.inputTxt}
                            placeholder="Input dry waste item"
                            onChangeText={value => this.setState({ item: value })} />

                        <Text style={styles.label}>Weight of Dry Waste (kg) </Text>
                        <Input

                            containerStyle={styles.input}
                            inputStyle={styles.inputTxt}
                            keyboardType='numeric'
                            placeholder="Input dry waste weight"
                            onChangeText={value => this.setState({ weight: value })} />
                        
                        <Text style={styles.label}>Vehicle type: {this.state.vehicleType} </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={styles.screen}>
                                <Picker
                                    selectedValue={this.state.vehicleType}
                                    onValueChange={this.updateVehicle}
                                    mode="dropdown" // Android only
                                    style={styles.picker}
                                >
                                    <Picker.Item label="Please select vehicle type" value="Unknown" />
                                    <Picker.Item label="Car" value="Car" />
                                    <Picker.Item label="4x4Truck" value="4x4Truck" />
                                    <Picker.Item label="Lorry" value="Lorry" />
                                </Picker>

                            </View>
                        </View>

                        <Button
                            ViewComponent={LinearGradient}
                            linearGradientProps={{
                                colors: ['#655DCD', '#302A88', '#181544'],
                                start: { x: 0, y: 0.5 },
                                end: { x: 1, y: 0.5 }
                            }}
                            title="BOOKING"
                            titleStyle={styles.submitBtnTitle}
                            buttonStyle={styles.submitBtn}
                            onPress={() => this.createBooking()} />

                    </ScrollView>


                </View>
            </ThemeProvider>

        );
    }

};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    titleTxt: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 25,
        color: 'white',
        alignSelf: 'center'
    },
    datePickerStyle: {
        width: 200,
        marginTop: 20,
    },
    welcomeTxt: {
        fontFamily: 'Montserrat-Bold',
        marginTop: 30,
        marginBottom: 30,
        paddingLeft: 20,
        fontSize: 25
    },
    chosenlabel: {
        marginRight: 35,
        paddingLeft: 20,
        fontSize: 20,
        color: '#000',
    },
    label: {
        marginRight: 35,
        paddingLeft: 20,
        fontSize: 20,
        color: '#302A88'
    },
    dateInput: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
        backgroundColor: 'white',
        height: 50,
        width: '50%',
        marginLeft: 10,
        marginRight: 20,
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ffffff'
    },
    input: {
        paddingLeft: 20,
        paddingRight: 20
    },
    inputTxt: {
        fontFamily: 'Montserrat-Regular'
    },
    submitBtn: {
        marginTop: 50,
        borderRadius: 25,
        width: '80%',
        margin: 40,
    },
    submitBtnTitle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 20
    },
    linearGradient: {
        opacity: 0.8
    },
    picker: {
        marginVertical: 10,
        width: 300,
        padding: 10,
        borderWidth: 1,
        borderColor: "#666",
        color: '#302A88',
    },
    screen: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
        backgroundColor: 'white',
        height: 50,
        width: '80%',
        marginLeft: 10,
        marginRight: 20,
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ffffff'
    },
    radioContainer: {
        marginTop: 5,
        marginBottom: 5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    radioText: {
        marginRight: 20,
        fontSize: 20,
        color: '#000',
    },
    radioLabel: {
        marginRight: 35,
        fontSize: 20,
        color: '#302A88'
    },
    radioCircle: {
        height: 30,
        width: 30,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#302A88',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedRb: {
        width: 15,
        height: 15,
        borderRadius: 50,
        backgroundColor: '#302A88',
    },
    result: {
        marginTop: 20,
        color: 'white',
        fontWeight: '600',
        backgroundColor: '#F3FBFE',
    },
});


export default Booking;