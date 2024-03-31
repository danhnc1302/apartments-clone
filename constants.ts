import { Dimensions, Platform, StatusBar } from "react-native";
import { AuthRequestPromptOptions } from "expo-auth-session";
export const LISTMARGIN = 10;
export const WIDTH = Dimensions.get("screen").width - LISTMARGIN * 2;

const baseHeight = 160;
const iosNotch = 40;
const iosHeight = baseHeight + iosNotch;
let androidHeight = baseHeight;
let androidNotch = 0;
if (StatusBar.currentHeight) androidNotch = StatusBar.currentHeight;
androidHeight += androidNotch;

export const HEADERHEIGHT = Platform.OS === "ios" ? iosHeight : androidHeight;

const serverUrl = "http://172.16.0.204:4000/api";
const location = "/location";
const user = "/user";
const manager = "/manager";

const locationEndpoint = serverUrl + location;
const userEndpoint = serverUrl + user;
const managerEndpoint = serverUrl + manager;

export const endpoints = {
    search: locationEndpoint + "/search",
    autoComplete: locationEndpoint + "/autocomplete",
    register: userEndpoint + "/register",
    login: userEndpoint + "/login",
    facebook: userEndpoint + "/facebook",
    google: userEndpoint + "/google",
    apple: userEndpoint + "/apple",
    forgotPassword: userEndpoint + "/forgotpassword",
    resetPassword: userEndpoint + "/resetpassword",
    createManager: managerEndpoint + "/create",
    getManagersByUserId: managerEndpoint + "/userid/",

}

export const proxyOptions: AuthRequestPromptOptions = {
    useProxy: true,
    projectNameForProxy: "@danhdevapp/apartments-clone"
  };