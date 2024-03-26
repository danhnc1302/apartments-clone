import React, { useState, useRef } from 'react'
import {
  View,
  StyleSheet,
  ViewStyle,
  Pressable,
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
    <Pressable onPress={onPress} style={[style, styles.container]}>
      <ImageCarousel onImagePress={onPress} images={property.images} chevronsShown={true}/>
      <CardInformation property={property} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: LISTMARGIN,
    borderRadius: 3,
    backgroundColor: "white"
  }
})