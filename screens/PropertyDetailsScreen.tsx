import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList,
  Dimensions
} from 'react-native';

import { Screen } from "../components/Screen";
import { ImageCarousel } from "../components/ImageCarousel";
import { PropertyHeaderSection } from "../components/PropertyDetailsSections/PropertyHeaderSection";
import { PricingAndFLoorPlanSection } from "../components/PropertyDetailsSections/PricingAndFloorPlanSection";
import { AboutSection } from "../components/PropertyDetailsSections/AboutSection";
import { Divider } from '@ui-kitten/components';

import {properties} from "../data/properties";
import { theme } from '../theme';

const PropertyDetailsScreen = ({
  route,
}:{
  route: { params: { propertyID: number }}
}) => {

  const index = properties.findIndex((i) => i.ID === route.params.propertyID)
  const property = properties[index]

  return (
    <Screen>
      <FlatList
        data={[property]}
        keyExtractor={(item) => item.ID.toString()}
        renderItem={({item}) => (
          <>
            {
              item.images ? <ImageCarousel images={item.images} indexShown imageStyle={styles.image}/> : null
            }
            <View style={styles.contentContainer}>
              <PropertyHeaderSection property={item}/>
              <Divider style={styles.divider}/>
              <PricingAndFLoorPlanSection property={item}/>
              <Divider style={styles.divider}/>
              <AboutSection property={item}/>
              <Divider style={styles.divider}/>

            </View>
          </>
        )}
      />
    </Screen>
  )
}

export default PropertyDetailsScreen

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get("screen").width,
    height: 250,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0
  },
  contentContainer: {
    marginHorizontal: 10
  },
  divider: {
    backgroundColor: theme['color-gray'],
    marginTop: 10
  }
})