import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Image,
  Pressable,
  FlatList
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { WIDTH } from '../constants';

export const ImageCarousel = ({ images }: { images: string[] }) => {

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
  
  return (
    <>
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
          <Image
            source={{ uri: item }}
            style={styles.image}
          />
        }
        keyExtractor={(item) => item}
      />
      <Pressable style={[styles.chevron, { left: 10 }]} onPress={handlePressLeft}>
        <MaterialCommunityIcons name="chevron-left" size={46} color="white" />
      </Pressable>
      <Pressable style={[styles.chevron, { right: 10 }]} onPress={handlePressRight}>
        <MaterialCommunityIcons name="chevron-right" size={46} color="white" />
      </Pressable>
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
  }
})