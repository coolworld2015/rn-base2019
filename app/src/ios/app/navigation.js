import React from 'react';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import Phones from '../phones/phones';
import PhoneDetails from '../phones/phoneDetails';

import Search from '../search/search';
import SearchResults from '../search/searchResults';

import Users from '../users/users';
import UserDetails from '../users/userDetails';
import UserAdd from '../users/userAdd';

import Audit from '../audit/audit';
import AuditDetails from '../audit/auditDetails';

const PhonesTab = createStackNavigator({
  Phones,
  PhoneDetails,
  Search,
  SearchResults
});

const UsersTab = createStackNavigator({
  Users,
  UserDetails,
  UserAdd
});

const AuditTab = createStackNavigator({
  Audit,
  AuditDetails
});

class Quit extends React.Component {
  render() {
    window.appConfig.onLogOut();
    return null
  }
}

const TabNavigator = createBottomTabNavigator({
  Phones: PhonesTab,
  Users: UsersTab,
  Audit: AuditTab,
  Quit: Quit
});

export default createAppContainer(TabNavigator);