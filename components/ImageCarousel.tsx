import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  ImageStyle,
  View
} from 'react-native';
import { Text } from '@ui-kitten/components';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { WIDTH } from '../constants';

export const ImageCarousel = ({
  images,
  onImagePress,
  chevronsShown,
  indexShown,
  imageStyle,
}: {
  images: string[],
  onImagePress?: () => void,
  chevronsShown?: boolean,
  indexShown?: boolean,
  imageStyle?: ImageStyle
}) => {

  const viewConfigRef = { viewAreaCoveragePercentThreshold: 95 }
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
        index: images.length - 1,
      })
    }
    flatListRef.current?.scrollToIndex({
      index: activeIndex - 1
    })
  }

  const handlePressRight = () => {
    if (activeIndex === images.length - 1) {
      return flatListRef.current?.scrollToIndex({
        animated: false,
        index: 0,
      })
    }
    flatListRef.current?.scrollToIndex({
      index: activeIndex + 1
    })
  }

  console.log("image: ", images)
  return (
    <>
      {
        images && images.length > 0 ? (
        <FlatList
            ref={(ref) => (flatListRef.current = ref)}
            data={images}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToAlignment='center'
            pagingEnabled
            viewabilityConfig={viewConfigRef}
            onViewableItemsChanged={onViewRef.current}
            renderItem={({ item, index }) =>
              <Pressable onPress={onImagePress}>
                <Image
                  source={{ uri: item }}
                  style={[styles.image, imageStyle]}
                />
              </Pressable>
            }
            keyExtractor={(item) => item}
          />
        ) : (
          <Image
          source={require("../assets/NoImage.jpeg")}
          style={[styles.image, imageStyle]}
        />
        )
    }

      {
        chevronsShown && (
          <>
            <Pressable style={[styles.chevron, { left: 10 }]} onPress={handlePressLeft}>
              <MaterialCommunityIcons name="chevron-left" size={46} color="white" />
            </Pressable>
            <Pressable style={[styles.chevron, { right: 10 }]} onPress={handlePressRight}>
              <MaterialCommunityIcons name="chevron-right" size={46} color="white" />
            </Pressable>
          </>
        )
      }
      {

        indexShown && (
          <View style={styles.index}>
            <Text category={"c2"} style={styles.indexText}>
              {activeIndex + 1} of {images.length} photos
            </Text>
          </View>
        )
      }
    </>
  )
}

const styles = StyleSheet.create({
  image: {
    width: WIDTH,
    height: 200,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5
  },
  chevron: {
    position: "absolute",
    top: 95,
  },
  index: {
    position: "absolute",
    top: 20,
    left: 15,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 30
  },
  indexText: {
    color: "#fff"
  }
})