/** @format */

import {AppRegistry , Platform} from 'react-native';
import iOS from './app/src/ios/app/app';
import Android from './app/src/android/app/app';
import {name as appName} from './app.json';

window.appConfig = {
    access_token: '',
    url: 'http://jwt-base.herokuapp.com/',
    users: {
        refresh: true,
        items: [],
        item: {}
    },
    outputs: {
        refresh: true,
        items: [],
        item: {}
    },
    contacts: {
        refresh: true,
        items: [],
        item: {}
    },
    phones: {
        refresh: true,
        items: [],
        item: {}
    },
    audit: {
        refresh: true,
        items: [],
        item: {}
    }
};

const App = Platform.select({
    ios: () => iOS,
    android: () => Android,
})();



AppRegistry.registerComponent(appName, () => App);
