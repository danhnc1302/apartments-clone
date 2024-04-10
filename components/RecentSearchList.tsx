import React, { useState } from "react";
import {
    StyleSheet,
    ViewStyle,
    View
} from "react-native";
import { Button } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

import { Location } from "../types/locationIQ";
import { RecentSearchButton } from "./RecentSearchButton";
import { getFormattedLocationText } from "../utils/getFormattedLocationText";

export const RecentSearchList = ({
    recentSearches,
    style
}: {
    recentSearches?: Location[],
    style?: ViewStyle
}) => {
    const navigation = useNavigation()
    const [showMore, setShowMore] = useState(false)

    const handleButtonPress = () => {
        setShowMore(!showMore)
    }

    const ShowButton = ({ text }: { text: string }) => {
        return (
            <Button
                appearance={"ghost"}
                status="info"
                style={styles.showButton}
                onPress={handleButtonPress}
            >
                {text}
            </Button>
        )
    }

    const handleRecetnSearchButtonPress = (location: Location) => {
        navigation.navigate("Root", {
            screen: "Search",
            params: {
                location: getFormattedLocationText(location),
                lat: location.lat,
                lon: location.lon,
                boundingBox: location.boundingbox
            },
        });
    };

    const getList = () => {
        if (!recentSearches || recentSearches.length === 0) return;
        if (recentSearches.length > 2 && !showMore) {
            return (
                <>
                    {
                        recentSearches?.map((i, index) =>
                        {
                            console.log(i)
                            return (
                                index < 2 ? (
                                    <RecentSearchButton
                                        key={i.display_name + index}
                                        name={getFormattedLocationText(i)}
                                        style={styles.recentSearchButton}
                                        onPress={() => handleRecetnSearchButtonPress(i)}
                                    />
                                ) : null
                            )
                        }
                        )
                    }
                    <ShowButton text="See More" />
                </>
            )
        }
        return (
            <>
                {
                    recentSearches?.map((i, index) =>
                        index < 2 ?  (
                            <RecentSearchButton
                                key={i.display_name + index}
                                name={getFormattedLocationText(i)}
                                style={styles.recentSearchButton}
                                onPress={() => handleRecetnSearchButtonPress(i)}
                            />
                        ) : null
                    )
                }
                {recentSearches.length > 2 ? <ShowButton text="See Less" /> : null}
            </>
        )
    }

    return (
        <View style={style}>
            {getList()}
        </View>
    )
}

const styles = StyleSheet.create({
    recentSearchButton: {
        marginVertical: 5
    },
    showButton: {
        alignSelf: "flex-start"
    },
})