import React from "react";
import {
    Text,
    TouchableOpacity, 
    Platform,
    StyleSheet
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { theme } from "../theme";

import { Row } from "./Row";

export const HeaderInput = () => {
    return (
        <TouchableOpacity style={styles.container}>
            <Row style={{ alignItems: "center" }}>
                <MaterialCommunityIcons name="magnify" size={30} color={theme["color-primary-500"]} />
                <Text style={styles.text}>Find your location</Text>
            </Row>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === "ios" ? 50 : 30,
        borderWidth: 1,
        borderColor: "#d3d3d3",
        borderRadius: 30,
        padding: 8
    },
    text: { 
        marginLeft: 10 
    }
})