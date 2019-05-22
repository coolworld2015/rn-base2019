'use strict';

import React, {Component} from 'react';
import {
    BackHandler
} from 'react-native';

console.disableYellowBox = true;

import Login from './login';
import AppContainer from './appContainer';

class App extends Component {
    constructor(props) {
        super(props);

        BackHandler.addEventListener('hardwareBackPress', () => {
			if (this.props.navigator) {
				this.props.navigator.pop();
			}
			return true;
		});

        this.state = {
            isLoggedIn: false
        };

        window.appConfig = {
            access_token: '',
            url: 'http://jwt-base.herokuapp.com/',
			onLogOut: this.onLogOut.bind(this),
			balance: {
                refresh: false
            },
            outputs: {
                refresh: false
            },
            contacts: {
                refresh: false
            },

            users: {
                refresh: false
            },
            phones: {
                refresh: false
            }
        };
    }

    render() {
        if (this.state.isLoggedIn) {
            return (
                <AppContainer />
            )
        } else {
            return (
                <Login onLogin={this.onLogin.bind(this)}/>
            )
        }
    }

    onLogin() {
        this.setState({isLoggedIn: true});
    }

    onLogOut() {
        this.setState({isLoggedIn: false});
    }
}

export default App;
