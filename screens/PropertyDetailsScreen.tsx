import React from "react";
import { StyleSheet, FlatList, View, Dimensions } from "react-native";
import { ImageCarousel } from "../components/ImageCarousel";
import { Divider, Text } from "@ui-kitten/components";
import { useQuery } from "react-query";
import axios from "axios";

import { PropertyHeaderSection } from "../components/PropertyDetailsSections/PropertyHeaderSection";
import { Screen } from "../components/Screen";
import { properties } from "../data/properties";
import { theme } from "../theme";
import { PricingAndFLoorPlanSection } from "../components/PropertyDetailsSections/PricingAndFloorPlanSection";
import { AboutSection } from "../components/PropertyDetailsSections/AboutSection";
import { ContactSection } from "../components/PropertyDetailsSections/ContactSection";
import { AmenitiesSection } from "../components/PropertyDetailsSections/AmenitiesSection";
import { LeaseAndFeesSection } from "../components/PropertyDetailsSections/LeaseAndFeesSection";
import { LocationSection } from "../components/PropertyDetailsSections/LocationSection";
import { ReviewSection } from "../components/PropertyDetailsSections/ReviewSection";
import { endpoints, queryKeys } from "../constants";
import { useSelectedPropertyQuery } from "../hooks/queries/useSelectedPropertyQuery";


const PropertyDetailsScreen = ({
  route,
}: {
  route: { params: { propertyID: number } };
}) => {
  // const property = useSelectedPropertyQuery(route.params?.propertyID);
  const index = properties.findIndex((i) => i.ID === route.params.propertyID)
  const property = properties[index]

  if (!property) return <Text>Unable to get property ...</Text>;

  return (
    <Screen>
      <FlatList
        data={[property]}
        keyExtractor={(item) => item.ID.toString()}
        renderItem={({ item }) => (
          <>
            {item.images ? (
              <ImageCarousel
                images={item.images}
                indexShown
                imageStyle={styles.image}
              />
            ) : null}
            <View style={styles.contentContainer}>
              <PropertyHeaderSection property={item} />
              <Divider style={styles.divider} />
              <PricingAndFLoorPlanSection property={item} />
              <Divider style={styles.divider} />
              <AboutSection property={item} />
              <Divider style={styles.divider} />
              <ContactSection property={item} />
              <Divider style={styles.divider} />
              <AmenitiesSection property={item} />
              <Divider style={styles.divider} />
              <LeaseAndFeesSection property={item} />
              <Divider style={styles.divider} />
              <LocationSection property={item} />
              <Divider style={styles.divider} />
              <ReviewSection property={item} />
              <Divider style={styles.divider} />
            </View>
          </>
        )}
      />
    </Screen>
  );
};

export default PropertyDetailsScreen;

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get("window").width,
    height: 250,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  contentContainer: {
    marginHorizontal: 10,
  },
  divider: {
    backgroundColor: theme["color-gray"],
    marginTop: 10,
  },
});