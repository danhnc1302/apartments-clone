import React from "react";
import {
    View,
    StyleSheet, 
    TouchableOpacity,
    ViewStyle
} from "react-native";
import { Text } from "@ui-kitten/components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { Theme } from "@react-navigation/native";

import { Row } from "./Row";

export const ModalHeader = (
    {
        xShown,
        text, 
        style,
        onPress
    }: {
        xShown?: boolean,
        text?: string,
        style?: ViewStyle | ViewStyle[],
        onPress?: () => void
    }
) => {

    const navigation = useNavigation()

    if (text) {
        return (
            <Row style={[styles.container, style as ViewStyle]}>
                {
                    xShown ? (
                        <MaterialCommunityIcons 
                            onPress={onPress ? onPress : navigation.goBack}
                            style={styles.close}
                            name="close"
                            color="black"
                            size={24}
                        />
                    ) : null
                }
                <Text category={"h5"}>{text}</Text>
            </Row>
            
        )
    }   
    
    return (
        <View style={[styles.container, style as ViewStyle]}>
            <View style={styles.bar} />
        </View>
    )
}

const styles = StyleSheet.create({
    close: {
        position: "absolute",
        left: 10,
        alignSelf: "center"
    },
    container: {
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#a4a4a4"
    },
    bar: {
        width: 50,
        backgroundColor: "#a4a4a4",
        height: 4,
        borderRadius: 30
    }
})
