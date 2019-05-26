import React from 'react';
import { Button, Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import Contacts from './app/src/ios/contacts/contacts';
import Users from './app/src/ios/users/users';
import UserDetails from './app/src/ios/users/userDetails';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
        <Button
            title="Go to Home"
            onPress={() => this.props.navigation.navigate('Contacts')}
        />
      </View>
    );
  }
}

const UsersTab = createStackNavigator({
  Users: Users,
  UserDetails: UserDetails
});

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Contacts: Contacts,
});

const TabNavigator = createBottomTabNavigator({
  //Contacts: Contacts,
  Users: UsersTab,
  Home: HomeStack,
  Settings: SettingsScreen,
  Settings1: SettingsScreen
});

export default createAppContainer(TabNavigator);