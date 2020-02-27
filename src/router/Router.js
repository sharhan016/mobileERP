import React, { Component } from "react";
import { View, Text, Dimensions } from "react-native";
import 'react-native-gesture-handler';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Feather from 'react-native-vector-icons/Feather';
import LoginPage from '../screens/LoginPage';
import AliasPage from '../screens/AliasPage';
import DashboardPage from '../screens/DashboardPage';
import CustomerPage from '../screens/CustomerPage';
import AuthScreen from '../screens/AuthScreen';
import ReportPage from '../screens/ReportPage';
import Sidebar from '../components/SideBar';
import colors from "../config/colors";

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
    Alias: AliasPage,
    SignIn: LoginPage,
    //SignUp: RegisterPage
});

const DashStack = createStackNavigator({
    Dashboard: DashboardPage,
    Report: ReportPage,
    Customer: CustomerPage
});

const AppDrawer = createDrawerNavigator({
    Home: {
        screen: DashStack,
        navigationOptions: {
            title: 'Home',
            drawerIcon: ({ tintColor }) => <Feather name="home" size={18} color={tintColor} />
        }
    },
    Reports: {
        screen: ReportPage,
        navigationOptions: {
            title: 'Reports',
            drawerIcon: ({tintColor}) => <Feather name="list" size={18} color={tintColor} />
        }
    }
},
{
    contentComponent: props => <Sidebar {...props} />,
    drawerWidth: Dimensions.get('window').width * 0.67,
    hideStatusBar: false,
    contentOptions: {
        activeBackgroundColor: colors.DRAWER_ACTIVE,
        activeTintColor: colors.DRAWER_TINT,
        itemsContainerStyle: {
            marginTop: 4,
            marginHorizontal: 8
        },
        itemStyle: {
            borderRadius: 5
        }
    },
    initialRouteName: 'Home',
    headerMode : 'screen'
}
);

const AppSwitchScreens = createSwitchNavigator({
    Auth: AuthScreen,
    Login: LoginStack,
    Dashboard: AppDrawer
});

export default createAppContainer(AppSwitchScreens);
