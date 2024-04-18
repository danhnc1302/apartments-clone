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
export const PHOTOS_STR = "photos";
export const AMENITIES_STR = "amenities";
export const DESCRIPTION_STR = "description";

const serverUrl = "http:/172.16.0.162:4000/api";
const location = "/location";
const user = "/user";
const property = "/property";
const apartment = "/apartment";
const review = "/review";

const locationEndpoint = serverUrl + location;
const userEndpoint = serverUrl + user;
const propertyEndpoint = serverUrl + property;
const apartmentEndpoint = serverUrl + apartment;
const reviewEndpoint = serverUrl + review;
const savedEndpoint = (id: number) => `${userEndpoint}/${id}/properties/saved`;

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
    createProperty: propertyEndpoint + "/create",
    getPropertyByID: propertyEndpoint + "/",
    getPropertiesByUserID: propertyEndpoint + "/userId/",
    deleteProperty: propertyEndpoint + "/",
    updateProperty: propertyEndpoint + "/update/",
    updateApartments: apartmentEndpoint + "/property/",
    getApartmentsByPropertyID: apartmentEndpoint + "/property/",
    createReview: reviewEndpoint + "/property/",
    getSavedPropertiesByUserID: savedEndpoint,
    alterSavedPropertiesByUserID: savedEndpoint,
    getPropertiesByBoundingBox: propertyEndpoint + "/search",
}

export const proxyOptions: AuthRequestPromptOptions = {
    useProxy: true,
    projectNameForProxy: "@danhdevapp/apartments-clone"
};

export const queryKeys = {
    contactedProperties: "contactedProperties",
    searchProperties: "searchProperties",
    selectedProperty: "selectedProperty",
    savedProperties: "savedProperties",
    myProperties: "myProperties",
    editProperty: "editProperty",
    apartments: "apartments",
    conversations: "conversations",
    selectedConversation: "selectedConversation",
};