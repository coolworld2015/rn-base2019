'use strict';

import React, {Component} from 'react';
import {
    TabBarIOS,
    NavigatorIOS,
    Alert
} from 'react-native';

import Balance from '../balance/balance';

import Inputs from '../inputs/inputs';
import Outputs from '../outputs/outputs';
import SentTransfer from '../outputs/sentTransfer';

import Contacts from '../contacts/contacts';
import AddContact from "../contacts/addContact";

class AppContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTab: 'Balance'
        };
    }

    onLogOut() {
        this.props.onLogOut();
    }

    render() {
        return (
            <TabBarIOS>

                <TabBarIOS.Item
                    title="Balance"
                    icon={require('../../../img/main.png')}
                    selected={this.state.selectedTab === 'Balance'}
                    onPress={() => this.setState({selectedTab: 'Balance'})}>

                    <NavigatorIOS
                        style={{
                            flex: 1
                        }}
                        initialRoute={{
                            component: Balance,
                            title: 'Balance'
                        }}
                    />
                </TabBarIOS.Item>

                <TabBarIOS.Item
                    title="Received"
                    icon={require('../../../img/down.png')}
                    selected={this.state.selectedTab === 'Received'}
                    onPress={() => this.setState({selectedTab: 'Received'})}>

                    <NavigatorIOS
                        style={{
                            flex: 1
                        }}
                        ref="inputs"
                        initialRoute={{
                            component: Inputs,
                            title: 'Received'
                        }}
                    />
                </TabBarIOS.Item>

                <TabBarIOS.Item
                    title="Send"
                    icon={require('../../../img/up.png')}
                    selected={this.state.selectedTab === 'Send'}
                    onPress={() => this.setState({selectedTab: 'Send'})}>

                    <NavigatorIOS
                        style={{
                            flex: 1
                        }}
                        ref="outputs"
                        initialRoute={{
                            component: Outputs,
                            title: 'Send',
                            rightButtonTitle: 'New',
                            onRightButtonPress: () => {
                                this.refs.outputs.navigator.push({
                                    title: "New transfer",
                                    component: SentTransfer
                                });
                            }
                        }}
                    />
                </TabBarIOS.Item>

                <TabBarIOS.Item
                    title="Contacts"
                    icon={require('../../../img/users.png')}
                    selected={this.state.selectedTab === 'Contacts'}
                    onPress={() => this.setState({selectedTab: 'Contacts'})}>

                    <NavigatorIOS
                        style={{
                            flex: 1
                        }}
                        ref="contacts"
                        initialRoute={{
                            component: Contacts,
                            title: 'Contacts',
                            rightButtonTitle: 'New',
                            onRightButtonPress: () => {
                                this.refs.contacts.navigator.push({
                                    title: "New record",
                                    component: AddContact
                                });
                            }
                        }}
                    />
                </TabBarIOS.Item>

                <TabBarIOS.Item
                    title="Logout"
                    icon={require('../../../img/log-out.png')}
                    selected={this.state.selectedTab === 'Logout'}
                    onPress={this.onLogOut.bind(this)}>
                </TabBarIOS.Item>

            </TabBarIOS>
        );
    }
}

export default AppContainer;
