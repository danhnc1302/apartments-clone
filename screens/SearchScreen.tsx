import React, { useState, useRef } from 'react'
import {
  Animated,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  Pressable
} from "react-native";
import { Screen } from '../components/Screen'
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from "@ui-kitten/components";
import { theme } from '../theme';

const LIST_MARGIN = 10
const WIDTH = Dimensions.get("screen").width - LIST_MARGIN * 2

const SearchScreen = () => {
  const viewConfigRef = { viewAreaCoveragePercentThreshold: 95};

  const property = {
    images: [
      "https://images1.apartments.com/i2/r15AJDxorBZooYLEXNeGbU2qua2xs-1sSRUfC_VHPn8/117/no-17-allapattah-residences-miami-fl-building-photo.jpg?p=1",
      "https://images1.apartments.com/i2/IYerLi-DFMJgK8wX4gdMKcIvYvLOvzhDgnPgXe9mzpw/117/the-julia-residences-miami-fl-building-photo.jpg?p=1",
      "https://images1.apartments.com/i2/z0zPk-e1F_mv2OO6dwBbMRa8lCpVQnVlIzlEzclL87U/117/advenir-at-ludlam-trail-miami-fl-building-photo.jpg?p=1"
    ],
    rentLow: 3750,
    rentHigh: 31054,
    bedRoomLow: 1,
    bedRoomHigh: 5,
    name: "The Hamilton",
    street: "555 NE 34th 5t",
    city: "Miami",
    state: "Florida",
    zip: "33147",
    tags: ["parking"]
  }

  const flatListRef = useRef<FlatList | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const onViewRef = useRef(({ changed }: { changed: any }) => {
    if (changed[0].isViewable) {
      setActiveIndex(changed[0].index)
      console.log("Active Index:", changed[0].index);
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
    <Screen style={{ marginHorizontal: LIST_MARGIN }}>
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
        <Pressable style={{ position: "absolute", top: 95 }} onPress={handlePressLeft}>
          <MaterialCommunityIcons name="chevron-left" size={32} color="red" />
        </Pressable>
        <Pressable style={{ position: "absolute", top: 95, right: 5 }} onPress={handlePressRight}>
          <MaterialCommunityIcons name="chevron-right" size={32} color="red" />
        </Pressable>

        <View style={{ paddingVertical: 10, paddingHorizontal: 5, borderColor: "#d3d3d3", borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderWidth: 1 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text>${property.rentLow.toString()} - {property.rentHigh.toString()}</Text>
            <MaterialCommunityIcons name="heart-outline" size={24} color={theme["color-primary-500"]} />
          </View>
          <Text>{property.bedRoomLow} - {property.bedRoomHigh}</Text>
          <Text>{property.name}</Text>
          <Text>{property.street}</Text>
          <Text>{property.city}, {property.state} {property.zip}</Text>
          <Text style={{ marginTop: 5 }}>{property.tags.map((tag, index) => index === property.tags.length ? tag : `${tag}`)}</Text>
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
    </Screen>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  card: { marginVertical: 5 },
  lottieContainer: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: { height: 200, width: 200 },
  subHeader: {
    marginTop: 10,
  },
})