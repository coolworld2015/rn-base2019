'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableWithoutFeedback,
    ScrollView,
    ActivityIndicator,
    TextInput,
    Picker,
    BackHandler
} from 'react-native';

class SentTransfer extends Component {
    constructor(props) {
        super(props);

        BackHandler.addEventListener('hardwareBackPress', () => {
            if (this.props.navigator) {
                this.props.navigator.pop();
            }
            return true;
        });

        this.state = {
            contacts: [{email: 'Select e-mail'}],
            showProgress: false,
            bugANDROID: ''
        }
    }

    componentDidMount() {
        this.getContacts();
    }

    getContacts() {
        this.setState({
            serverError: false,
            showProgressContacts: true,
            bugANDROID: ' '
        });

        fetch(appConfig.url + 'Customers?access_token='  + appConfig.access_token, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response)=> response.json())
            .then((responseData)=> {
                let items = responseData.sort(this.sort);
                items.unshift({email: 'Select e-mail'});
                this.setState({
                    contacts: items,
                    serverError: false
                });
            })
            .catch((error)=> {
                this.setState({
                    serverError: true
                });
                setTimeout(() => {
                    appConfig.onLogOut();
                }, 1000);
            })
            .finally(()=> {
                this.setState({
                    showProgressContacts: false
                });
            });
    }

    sort(a, b) {
        let nameA = a.username.toLowerCase(), nameB = b.username.toLowerCase();
        if (nameA < nameB) {
            return -1
        }
        if (nameA > nameB) {
            return 1
        }
        return 0;
    }

    addItem() {
        if (this.state.contact === undefined || this.state.contact === '' ||this.state.contactEmail === 'Select e-mail' ||
            this.state.amount === undefined || this.state.amount === '') {
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

        fetch(appConfig.url + 'Customers/transfer?access_token='  + appConfig.access_token, {
            method: 'post',
            body: JSON.stringify({
                recipient: this.state.contactEmail,
                value: this.state.amount
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
                    appConfig.balance.refresh = true;
                    appConfig.outputs.refresh = true;
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
                    animating={true}
                />
            </View>;
        }

        return (
            <View style={styles.container}>
                <ScrollView keyboardShouldPersistTaps='always'>
                    <View style={{backgroundColor: 'white'}}>
                        <View style={{
                            borderColor: 'darkblue',
                            borderWidth: 5,
                            marginTop: 10,
                            margin: 10,
                            marginBottom: 0,
                            flex: 1,
                            borderRadius: 5,
                            height: 200
                        }}>
                            <Picker style={{marginTop: -20, height: 0}}
                                    selectedValue={this.state.contact}

                                    onValueChange={(value) => {
                                        let arr = [].concat(this.state.contacts);
                                        let contact = arr.filter((el) => el.id == value);
                                        this.setState({
                                            contact: value,
                                            contactID: contact[0].id,
                                            contactEmail: contact[0].email,
                                            invalidValue: false
                                        })
                                    }}>

                                {this.state.contacts.map((item, i) =>
                                    <Picker.Item value={item.id} label={item.email} key={i}/>
                                )}
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.form}>
                        <TextInput
                            underlineColorAndroid='rgba(0,0,0,0)'
                            onChangeText={(text) => this.setState({
                                amount: text,
                                invalidValue: false
                            })}
                            style={styles.formInput}
                            value={this.state.amount}
                            placeholder='amount'>
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
        //marginTop: 10,
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

export default SentTransfer;
