import React, { useEffect, useRef, useState } from "react";
import {
    View,
    StyleSheet,
    Platform,
    TouchableOpacity
} from "react-native";
import MapView, { Region } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { theme } from "../theme";
import { Property } from "../types/property";

import { MapMarker } from "./MapMarker";
import { Card } from "./Card";
import { Button } from "@ui-kitten/components";
import { getPropertiesInArea } from "../data/properties";

let mapRegion: Region | undefined = undefined;

export const Map = ({
    properties,
    mapRef,
    initialRegion,
    location,
    setLocation,
    setProperties,
}: {
    properties: Property[],
    mapRef: React.MutableRefObject<MapView | null>,
    initialRegion?: Region | undefined,
    location: string,
    setLocation: (location: string) => void,
    setProperties: (properties: Property[]) => void
}) => {

    const [activeIndex, setActiveIndex] = useState(-1);
    const [showSearchAreaButton, setShowSearchAreaButton] = useState<boolean>(false);
    const [region, setRegion] = useState<Region | undefined>(
        mapRegion ? mapRegion : undefined
    )
    const [boundingBox, setBoundingBox] = useState<number[]>([]);
    const navigation = useNavigation();

    useEffect(() => {
        if (location === "Map Area") return;
        if (initialRegion) {
            setShowSearchAreaButton(false);
            setRegion(initialRegion);
        }
    }, [initialRegion])

    const unFocusProperty = () => {
        setActiveIndex(-1);
        navigation.setOptions({ tabBarStyle: { display: "flexs" } });
    }

    const handleMapPress = () => {
        if (Platform.OS === "android") unFocusProperty();
    }

    const handleMarkerPress = (index: number) => {
        setTimeout(() => {
            mapRef.current?.animateCamera({ center: { latitude: properties[index].lat, longitude: properties[index].lng } })
        }, 100);
        setTimeout(() => {
            const newRegion: Region = {
                latitude: properties[index].lat,
                latitudeDelta: region?.latitudeDelta ? region.latitudeDelta : 0.4,
                longitude: properties[index].lng,
                longitudeDelta: region?.longitudeDelta ? region.longitudeDelta : 0.4
            }
            setRegion(newRegion)
        }, 600);
        setActiveIndex(index)
        navigation.setOptions({ tabBarStyle: { display: "none" } })
    }

    const handleSearchAreaButtonPress = () => {
        setProperties(getPropertiesInArea(boundingBox));
        setLocation("Map Area");
        mapRegion = region;
        setShowSearchAreaButton(false);
    }

    return (
        <View style={styles.container}>
            <MapView
                provider={"google"}
                style={styles.map}
                userInterfaceStyle={"light"}
                ref={mapRef}
                onPress={handleMapPress}
                initialRegion={initialRegion ? initialRegion : undefined}
                onRegionChangeComplete={(region, isGesture) => {
                    if (isGesture?.isGesture) {
                        if (!showSearchAreaButton) setShowSearchAreaButton(true);
                        const newBoundingBox = [
                            region.latitude - region.latitudeDelta / 2,
                            region.latitude + region.latitudeDelta / 2,
                            region.longitude - region.longitudeDelta / 2,
                            region.longitude + region.longitudeDelta / 2,
                        ];
                        setRegion(region);
                        setBoundingBox(newBoundingBox);
                    }
                }}
            >
                {
                    properties.map((property, index) => <MapMarker lat={property.lat} lng={property.lng} color={activeIndex === index ? theme['color-info-400'] : theme['color-info-500']} onPress={() => handleMarkerPress(index)} />)
                }
            </MapView>
            {
                activeIndex > -1 && (
                    <>
                        {Platform.OS === "ios" && (
                            <TouchableOpacity style={styles.exit} onPress={unFocusProperty}>
                                <MaterialCommunityIcons name="close" color={theme["color-primary-500"]} size={24} />
                            </TouchableOpacity>
                        )}
                        <Card property={properties[activeIndex]} style={styles.card} onPress={() => navigation.navigate("PropertyDetails", { propertyID: properties[activeIndex].ID })} />
                    </>
                )
            }
            {
                showSearchAreaButton && activeIndex === -1 && (
                    <Button style={styles.searchAreaButton} appearance={"ghost"} onPress={handleSearchAreaButtonPress}>
                        Search Area
                    </Button>
                )
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