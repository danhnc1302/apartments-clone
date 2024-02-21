import React, { useState, useRef } from 'react'
import {
  View,
  StyleSheet,
  ViewStyle,
} from "react-native";

import { Property } from '../types/property';

import { ImageCarousel } from './ImageCarousel';
import { CardInformation } from './CardInformation';

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
    <View style={style}>
      <ImageCarousel images={property.images} />
      <CardInformation property={property} />
    </View>
  )
}

const styles = StyleSheet.create({})