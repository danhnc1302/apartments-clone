import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
    AccountTabParamList,
    RootStackParamList,
    RootTabParamList,
    RootTabScreenProps,
} from "../types";
import { theme } from "../theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import LinkingConfiguration from "./LinkingConfiguration";

import SearchScreen from "../screens/SearchScreen";
import AccountScreen from "../screens/AccountScreen";
import SavedScreen from "../screens/SavedScreen";

import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";

import AddPropertyScreen from "../screens/AddPropertyScreen";
import EditPropertyScreen from "../screens/EditPropertyScreen";
import FindLocationsScreen from "../screens/FindLocationsScreen";
import ManageUnitsScreen from "../screens/ManageUnitsScreen";
import MessagePropertyScreen from "../screens/MessagePropertyScreen";
import MyPropertiesScreen from "../screens/MyPropertiesScreen";
import PropertyDetailsScreen from "../screens/PropertyDetailsScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import ReviewScreen from "../screens/ReviewScreen";
import AccountSettingsScreen from "../screens/AccountSettingsScreen";
import ConversationsScreen from "../screens/ConversationsScreen";
import MessagesScreen from "../screens/MessagesScreen";


export default function Navigation() {
    return (
        <NavigationContainer theme={DefaultTheme}>
            <RootNavigation />
        </NavigationContainer>
    )
}

const Stack = createNativeStackNavigator<RootStackParamList>()
function RootNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
            <Stack.Group screenOptions={{ presentation: "modal" }}>
                <Stack.Screen
                    name="FindLocations"
                    component={FindLocationsScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SignIn"
                    component={SignInScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUpScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPasswordScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ResetPassword"
                    component={ResetPasswordScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="PropertyDetails"
                    component={PropertyDetailsScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="MessageProperty"
                    component={MessagePropertyScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AddProperty"
                    component={AddPropertyScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="EditProperty"
                    component={EditPropertyScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="MyProperties"
                    component={MyPropertiesScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ManageUnits"
                    component={ManageUnitsScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Review"
                    component={ReviewScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Group>
        </Stack.Navigator>
    )
}

const BottomTab = createBottomTabNavigator<RootTabParamList>()
function BottomTabNavigator() {
    return (
        <BottomTab.Navigator initialRouteName="Search"
            screenOptions={{
                tabBarActiveTintColor: theme["color-primary-500"],
            }}>
            <BottomTab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="magnify" color={color} />
                    ),
                }}
            />
            <BottomTab.Screen
                name="Saved"
                component={SavedScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="heart-outline" color={color} />
                    ),
                }}
            />
            <BottomTab.Screen
                name="AccountRoot"
                component={AccountStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="account-circle-outline" color={color} />
                    ),
                }}
            />
        </BottomTab.Navigator>
    )
}

const AccountStackNavigator = createNativeStackNavigator<AccountTabParamList>();
function AccountStack() {
    return (
        <AccountStackNavigator.Navigator initialRouteName="Account">
            <AccountStackNavigator.Screen
                name="Account"
                component={AccountScreen}
                options={{ headerShown: false }}
            />
            <AccountStackNavigator.Screen
                name="Settings"
                component={AccountSettingsScreen}
                options={{
                    headerTitle: "Account Settings",
                    headerBackTitle: "Back",
                }}
            />
            <AccountStackNavigator.Screen
                name="Conversations"
                component={ConversationsScreen}
                options={{ headerTitle: "Conversations", headerBackTitle: "Back" }}
            />
            <AccountStackNavigator.Screen
                name="Messages"
                component={MessagesScreen}
                options={{
                    headerBackTitle: "Back",
                }}
            />
        </AccountStackNavigator.Navigator>
    )
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
    name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
    color: string;
}) {
    return (
        <MaterialCommunityIcons size={30} style={{ marginBottom: -3 }} {...props} />
    );
}