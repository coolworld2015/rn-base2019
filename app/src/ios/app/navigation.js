import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import Users from '../users/users';
import UserDetails from '../users/userDetails';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
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
});

const TabNavigator = createBottomTabNavigator({
  Users: UsersTab,
  Home: HomeStack
});

export default createAppContainer(TabNavigator);