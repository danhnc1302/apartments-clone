import React from "react";
import {
    StyleSheet,
    TouchableOpacity
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native"; 

import { LISTMARGIN } from "../constants";
import { theme } from "../theme";

import { Row } from "./Row";

const HeaderLogisticsButton = ({
    label,
    onPress,
    iconName,
    style
}: {
    label: string,
    onPress: () => void,
    iconName?: any,
    style?: any
}) => {

    
    return (
        <TouchableOpacity onPress={onPress}>
            <Row style={[styles.row, style]}>
                {iconName ? (
                    <MaterialCommunityIcons
                        name={iconName}
                        color={theme["color-info-300"]}
                        size={18}
                    />
                ) : null}
                <Text category={"c1"} style={styles.logisticsButtonText}>{label}</Text>
            </Row>
        </TouchableOpacity>
    )
}

const handleOnPress = () => {

}

export const HeaderLogistics = ({
    mapShown,
    setMapShown
}: {
    mapShown: boolean,
    setMapShown: (bool: boolean) => void
}) => {

    const navigation = useNavigation()

    const handleMapPress = () => {
        navigation.setOptions({ tabBarStyle: {display: "flex"} })
        if (mapShown) return setMapShown(false)
        setMapShown(true)
    }

    return (
        <Row style={styles.container}>
            <Row style={styles.row}>
                <MaterialCommunityIcons name="map-marker" size={18} color={theme["color-primary-500"]} />
                <Text category={"c1"} appearance={"hint"}>12 Available</Text>
                <HeaderLogisticsButton label="Save" onPress={handleOnPress} style={{ marginLeft: 10 }} />
            </Row>
            <Row style={styles.row}>
                <HeaderLogisticsButton label="Sort" onPress={handleOnPress} iconName="sort" />
                {
                    mapShown ? (
                        <HeaderLogisticsButton label="List" onPress={handleMapPress} iconName="format-list-bulleted" style={{ marginLeft: 20 }} />
                    ):(
                        <HeaderLogisticsButton label="Map" onPress={handleMapPress} iconName="map-outline" style={{ marginLeft: 20 }} />
                    )
                }
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