import React, { useState, useRef } from 'react'
import {
  Animated,
  StyleSheet,
} from "react-native";
import { useNavigation } from '@react-navigation/native';

import { LISTMARGIN, HEADERHEIGHT } from '../constants';

import { Screen } from '../components/Screen';
import { Card } from '../components/Card';
import { AnimatedListHeader } from '../components/AnimatedListHeader';

const SearchScreen = () => {
  const properties = [
    {
      id: 1,
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
      tags: ["Parking"]
    },
    {
      id: 2,
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
      tags: ["Parking"]
    },
    {
      id: 3,
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
      tags: ["Parking"]
    },
  ]
  const navigation = useNavigation()

  const [scrollAnimation] = useState(new Animated.Value(0))
  return (
    <Screen>
      <AnimatedListHeader scrollAnimation={scrollAnimation} />
      <Animated.FlatList
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                y: scrollAnimation
              }
            }
          }
        ],
          {
            useNativeDriver: true
          }
        )}
        contentContainerStyle={{ paddingTop: HEADERHEIGHT - 20 }}
        bounces={false}
        scrollEventThrottle={16}
        data={properties}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        style={{ marginHorizontal: LISTMARGIN }}
        renderItem={({ item, index }) => <Card
          style={styles.card}
          property={item}
          onPress={() =>
            navigation.navigate("PropertyDetails", {
              propertyID: item.id,
            })
          } />}
      />
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