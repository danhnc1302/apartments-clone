import React, { useState } from 'react'
import { Animated, View, StyleSheet } from "react-native";
import { Screen } from '../components/Screen'
import { useNavigation } from '@react-navigation/native';
import { Card } from '../components/Card';

const SearchScreen = () => {
  const [scrollAnimation] = useState(new Animated.Value(0));
  const navigation = useNavigation();
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

  return (
    <Screen>
      <Card
        style={styles.card}
        property={property}
        onPress={() => { }}
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