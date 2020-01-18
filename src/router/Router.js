import React, { Component } from "react";
import { View, Text } from "react-native";
import 'react-native-gesture-handler';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Feather from 'react-native-vector-icons/Feather';
import LoginPage from '../screens/LoginPage';
import DashboardPage from '../screens/DashboradPage';
import AuthScreen from '../screens/AuthScreen';
import ReportPage from '../screens/ReportPage';


class Navigator extends Component {
    render() {
        return (
            <View>
                <Text>Navigator</Text>
            </View>
        );
    }
}

const LoginStack = createStackNavigator({
    SignIn: LoginPage,
    //SignUp: RegisterPage
});

const DashStack = createStackNavigator({
    Dashboard: DashboardPage,
    Report: ReportPage
});

const AppDrawer = createDrawerNavigator({
    Home: {
        screen: DashStack,
        navigationOptions: {
            title: 'Home',
            drawerIcon: ({ tintColor }) => <Feather name="home" size={18} color={tintColor} />
        }
    },

});

const AppSwitchScreens = createSwitchNavigator({
    Auth: AuthScreen,
    Login: LoginStack,
    Dashboard: AppDrawer
});

export default createAppContainer(AppSwitchScreens);
