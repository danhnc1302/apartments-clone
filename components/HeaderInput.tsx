import React from "react";
import {
    Text,
    TouchableOpacity, 
    Platform,
    StyleSheet
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"

import { theme } from "../theme";

import { Row } from "./Row";

export const HeaderInput = ({location}:{location: string}) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("FindLocations")}>
            <Row style={{ alignItems: "center" }}>
                <MaterialCommunityIcons name="magnify" size={30} color={theme["color-primary-500"]} />
                <Text style={styles.text}>{location}</Text>
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