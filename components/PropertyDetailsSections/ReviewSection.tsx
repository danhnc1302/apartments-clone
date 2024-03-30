import React from "react";
import {
    StyleSheet,
    FlatList
} from "react-native";
import {
    Text,
    Button
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

import { Property } from "../../types/property";
import { getStateAbbreviation } from "../../utils/getStateAbbreviation";

import { OverallReviewScoreCard } from "../../components/OverallReviewScoreCard";
import { ReviewCard } from "../../components/ReviewCard";

export const ReviewSection = ({
    property
}: {
    property: Property
}) => {
    
    const navigation = useNavigation();

    return (
        <>
            <Text category={"h5"} style={styles.defaultMarginVertical}>
                Reviews
            </Text>
            {property.reviews ? (
                <>
                    <OverallReviewScoreCard
                        numberOfReviews={property.reviews ? property.reviews.length : 0}
                        score={property.stars}
                        style={styles.defaultMarginVertical}
                    />
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.flatListMargin}
                        data={property.reviews}
                        keyExtractor={(item) => item.ID.toString()}
                        renderItem={({ item }) => <ReviewCard review={item} />}
                    />
                </>
            ) : (
                <Text>No reviews yet. Be the first one to review this property.</Text>
            )}

            <Button
                onPress={() =>
                    navigation.navigate("Review", {
                        propertyID: property.ID,
                        propertyName: property?.name
                            ? property.name
                            : `${property.street}, ${getStateAbbreviation(property.state)}, ${property.zip}`
                    })
                }
                style={styles.defaultMarginVertical}
            >
                Write a Review
            </Button>
        </>
    )
}

const styles = StyleSheet.create({
    defaultMarginVertical: { marginVertical: 10 },
    flatListMargin: { marginBottom: 50 },
})