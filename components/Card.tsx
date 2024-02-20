import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Pressable,
  ViewStyle,
} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from "@ui-kitten/components";

import { theme } from '../theme';
import { WIDTH } from '../constants';
import { Property } from '../types/property';

import { ImageCarousel } from './ImageCarousel';
const Card = ({
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
  const viewConfigRef = { viewAreaCoveragePercentThreshold: 95 };
  const flatListRef = useRef<FlatList | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const onViewRef = useRef(({ changed }: { changed: any }) => {
    if (changed[0].isViewable) {
      setActiveIndex(changed[0].index)
    }
  })

  const handlePressLeft = () => {
    if (activeIndex === 0) {
      return flatListRef.current?.scrollToIndex({
        animated: false,
        index: property.images.length - 1,
      })
    }
    flatListRef.current?.scrollToIndex({
      index: activeIndex - 1
    })
  }

  const handlePressRight = () => {
    if (activeIndex === property.images.length - 1) {
      return flatListRef.current?.scrollToIndex({
        animated: false,
        index: 0,
      })
    }
    flatListRef.current?.scrollToIndex({
      index: activeIndex + 1
    })
  }
  return (
    <View >
      <FlatList
        ref={(ref) => (flatListRef.current = ref)}
        data={property.images}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment='center'
        pagingEnabled
        viewabilityConfig={viewConfigRef}
        onViewableItemsChanged={onViewRef.current}
        renderItem={({ item, index }) =>
          <Image
            source={{ uri: item }}
            style={{
              height: 225, width: WIDTH, borderTopRightRadius: 5, borderTopLeftRadius: 5
            }}
          />
        }
        keyExtractor={(item) => item}
      />
      <Pressable style={{ position: "absolute", top: 95, left: 10 }} onPress={handlePressLeft}>
        <MaterialCommunityIcons name="chevron-left" size={46} color="white" />
      </Pressable>
      <Pressable style={{ position: "absolute", top: 95, right: 10 }} onPress={handlePressRight}>
        <MaterialCommunityIcons name="chevron-right" size={46} color="white" />
      </Pressable>

      <View style={{ paddingVertical: 10, paddingHorizontal: 5, borderColor: "#d3d3d3", borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderWidth: 1 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 20, fontWeight: "500" }}>${property.rentLow.toLocaleString()} - {property.rentHigh.toLocaleString()}</Text>
          <MaterialCommunityIcons name="heart-outline" size={24} color={theme["color-primary-500"]} />
        </View>
        <Text>{property.bedRoomLow} - {property.bedRoomHigh} Beds</Text>
        <Text>{property.name}</Text>
        <Text>{property.street}</Text>
        <Text>{property.city}, {property.state} {property.zip}</Text>
        <Text style={{ marginTop: 5 }}>{property.tags.map((tag: any, index: any) => index === property.tags.length ? tag : `${tag}`)}</Text>
        <View style={{ marginTop: 5, flexDirection: "row", justifyContent: "space-between" }}>
          <Button appearance='ghost' style={{ borderColor: theme["color-primary-500"], width: "49%" }} size="small" onPress={() => { }}>
            Email
          </Button>
          <Button size="small" style={{ width: "49%" }} onPress={() => { }}>
            Call
          </Button>
        </View>
      </View>
    </View>
  )
}

export default Card

const styles = StyleSheet.create({})