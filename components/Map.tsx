import React, { useRef, useState } from "react";
import {
    View,
    StyleSheet,
    Platform
} from "react-native";
import MapView from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

import { theme } from "../theme";
import { Property } from "../types/property";

import { MapMarker } from "./MapMarker";
import { Card } from "./Card";

export const Map = ({ properties }: { properties: Property[] }) => {
    const navigation = useNavigation()
    const [activeIndex, setActiveIndex] = useState(-1)
    const mapRef = useRef<MapView | null>(null)

    const handleMarkerPress = (index: number) => {
        if (Platform.OS === "ios") {
            setTimeout(() => {
                mapRef.current?.animateCamera({ center: { latitude: properties[index].lat, longitude: properties[index].lng } })
            }, 100)
        }
        setActiveIndex(index)
        navigation.setOptions({ tabBarStyle: { display: "none" } })
    }

    return (
        <View style={styles.container}>
            <MapView style={styles.map}>
                {
                    properties.map((property, index) => <MapMarker lat={property.lat} lng={property.lng} color={activeIndex === index ? theme['color-info-400'] : theme['color-info-500']} onPress={() => handleMarkerPress(index)} />)
                }
            </MapView>
            {
                activeIndex > -1 && <Card property={properties[activeIndex]} style={styles.card}/>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: "hidden",
    },
    map: {
        height: "100%",
        width: "100%",
    },
    card: {
        position: "absolute",
        bottom: 10,
    },
    exit: {
        backgroundColor: "#fff",
        padding: 10,
        position: "absolute",
        top: 170,
        left: 15,
        borderRadius: 30,
    },
    searchAreaButton: {
        position: "absolute",
        bottom: 30,
        zIndex: 100,
        borderRadius: 30,
        alignSelf: "center",
        backgroundColor: "white",
        borderColor: theme["color-gray"],
        borderWidth: 1,
    },
});