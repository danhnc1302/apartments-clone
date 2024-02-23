import React from "react";
import {
    StyleSheet,
    TouchableOpacity
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "@ui-kitten/components";

import { LISTMARGIN } from "../constants";
import { theme } from "../theme";

import { Row } from "./Row";

export const HeaderLogistics = () => {
    return (
        <Row style={styles.container}>
            <Row style={styles.row}>
                <MaterialCommunityIcons name="map-marker" size={18} color={theme["color-primary-500"]} />
                <Text category={"c1"} appearance={"hint"}>12 Available</Text>
                <TouchableOpacity>
                    <Text category={"c1"} style={{ color: theme["color-info-300"], fontWeight: "bold", marginLeft: 10 }}>Save</Text>
                </TouchableOpacity>
            </Row>
            <Row style={styles.row}>
                <Row style={styles.row}>
                    <MaterialCommunityIcons name="sort" color={theme["color-info-300"]} size={18} />
                    <TouchableOpacity>
                        <Text category={"c1"} style={styles.logisticsButtonText}>Save</Text>
                    </TouchableOpacity>
                </Row>
                <Row style={[styles.row, { marginLeft: 20 }]}>
                    <MaterialCommunityIcons name="map-outline" color={theme["color-info-300"]} size={18} />
                    <TouchableOpacity>
                        <Text category={"c1"} style={styles.logisticsButtonText}>sort</Text>
                    </TouchableOpacity>
                </Row>
            </Row>
        </Row>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: LISTMARGIN,
        marginVertical: 5,
      },
      row: {
        alignItems: "center",
      },
      logisticsButtonText: {
        color: theme["color-info-300"],
        fontWeight: "bold",
        marginLeft: 5,
      },
})