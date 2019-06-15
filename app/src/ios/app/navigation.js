import React from 'react';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import Users from '../users/users';
import UserDetails from '../users/userDetails';
import UserAdd from '../users/userAdd';

const UsersTab = createStackNavigator({
  Users: Users,
  UserDetails: UserDetails,
  UserAdd: UserAdd
});

class Quit extends React.Component {
  render() {
    window.appConfig.onLogOut();
    return null
  }
}

const TabNavigator = createBottomTabNavigator({
  Users: UsersTab,
  Quit: Quit
});

export default createAppContainer(TabNavigator);