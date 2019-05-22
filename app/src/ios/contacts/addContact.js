'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    ScrollView,
    ActivityIndicator,
    TextInput,
    BackHandler,
    KeyboardAvoidingView
} from 'react-native';

class AddContact extends Component {
    constructor(props) {
        super(props);

        BackHandler.addEventListener('hardwareBackPress', () => {
            if (this.props.navigator) {
                this.props.navigator.pop();
            }
            return true;
        });

        this.state = {
            showProgress: false,
            bugANDROID: ''
        }
    }

    addItem() {
         if (this.state.firstName === undefined || this.state.firstName === '' ||
             this.state.lastName === undefined || this.state.lastName === '' ||
             this.state.username === undefined || this.state.username === '' ||
             this.state.email === undefined || this.state.email === '' ||
             this.state.password === undefined || this.state.password === '') {
             this.setState({
                 invalidValue: true
             });
             return;
         }

        this.setState({
            serverError: false,
            showProgress: true,
            bugANDROID: ' '
        });

        fetch(appConfig.url + 'Customers?access_token='  + appConfig.access_token, {
            method: 'post',
            body: JSON.stringify({
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData)
                if (responseData.error) {
                    this.setState({
                        serverError: true
                    });
                } else
                {
                    appConfig.contacts.refresh = true;
                    this.props.navigator.pop();
                }
            })
            .catch((error) => {
                console.log(error)
                this.setState({
                    serverError: true
                });
            })
            .finally(() => {
                this.setState({
                    showProgress: false
                });
            });
    }

    goBack() {
        this.props.navigator.pop();
    }

    render() {
        let errorCtrl, validCtrl, loader;

        if (this.state.serverError) {
            errorCtrl = <Text style={styles.error}>
                Something went wrong.
            </Text>;
        }

        if (this.state.invalidValue) {
            validCtrl = <Text style={styles.error}>
                Value required - please provide.
            </Text>;
        }

        if (this.state.showProgress) {
            loader = <View style={styles.loader}>
                <ActivityIndicator
                    size="large"
                    color="darkblue"
                    animating={true}
                />
            </View>;
        }

        return (
            <View style={styles.container}>
                <ScrollView keyboardShouldPersistTaps='always'>
                    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                    <View style={styles.form}>
                        <TextInput
                            underlineColorAndroid='rgba(0,0,0,0)'
                            onChangeText={(text) => this.setState({
                                firstName: text,
                                invalidValue: false
                            })}
                            style={styles.formInput}
                            value={this.state.firstName}
                            placeholder='First Name'>
                        </TextInput>

                        <TextInput
                            underlineColorAndroid='rgba(0,0,0,0)'
                            onChangeText={(text) => this.setState({
                                lastName: text,
                                invalidValue: false
                            })}
                            style={styles.formInput}
                            value={this.state.lastName}
                            placeholder='Last Name'>
                        </TextInput>

                        <TextInput
                            underlineColorAndroid='rgba(0,0,0,0)'
                            onChangeText={(text) => this.setState({
                                username: text,
                                invalidValue: false
                            })}
                            style={styles.formInput}
                            value={this.state.username}
                            placeholder='User Name'>
                        </TextInput>

                        <TextInput
                            underlineColorAndroid='rgba(0,0,0,0)'
                            onChangeText={(text) => this.setState({
                                email: text,
                                invalidValue: false
                            })}
                            style={styles.formInput}
                            value={this.state.email}
                            placeholder='E-mail'>
                        </TextInput>

                        <TextInput
                            underlineColorAndroid='rgba(0,0,0,0)'
                            onChangeText={(text) => this.setState({
                                password: text,
                                invalidValue: false
                            })}
                            style={styles.formInput}
                            value={this.state.password}
                            placeholder='Password'>
                        </TextInput>

                        {validCtrl}

                        <TouchableHighlight
                            onPress={() => this.addItem()}
                            style={styles.button}>
                            <Text style={styles.buttonText}>
                                Sent
                            </Text>
                        </TouchableHighlight>

                        {errorCtrl}

                        {loader}

                        <Text>{this.state.bugANDROID}</Text>
                    </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        //backgroundColor: '#48BBEC',
        backgroundColor: 'darkblue',
        borderWidth: 0,
        borderColor: 'whitesmoke'
    },
    textSmall: {
        fontSize: 16,
        textAlign: 'center',
        margin: 16,
        fontWeight: 'bold',
        color: 'white'
    },
    textLarge: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        marginTop: 12,
        marginRight: 40,
        fontWeight: 'bold',
        color: 'white'
    },
    form: {
        flex: 1,
        padding: 10,
        justifyContent: 'flex-start',
        paddingBottom: 130,
        backgroundColor: 'white'
    },
    formInput: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
        color: 'black'
    },
    formInputArea: {
        height: 100,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
        color: 'black'
    },
    button: {
        height: 50,
        //backgroundColor: '#48BBEC',
        backgroundColor: 'darkblue',
        borderColor: '#48BBEC',
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    loader: {
        marginTop: 20
    },
    error: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center'
    }
});

export default AddContact;
