import React, { useState, useRef } from 'react'
import {
  View,
  StyleSheet,
  ViewStyle,
} from "react-native";

import { Property } from '../types/property';

import { ImageCarousel } from './ImageCarousel';
import { CardInformation } from './CardInformation';
import { LISTMARGIN } from '../constants';

export const Card = ({
  property,
  onPress,
  myProperty,
  style,
}: {
  property: Property;
  onPress?: () => void;
  myProperty?: boolean;
  style?: ViewStyle;
}) => {

  return (
    <View style={[style, styles.container]}>
      <ImageCarousel images={property.images} />
      <CardInformation property={property} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: LISTMARGIN,
    borderRadius: 3,
    backgroundColor: "white"
  }
})