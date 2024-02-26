import React, { useState, useRef } from 'react'
import {
  Animated,
  StyleSheet,
  View
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import MapView from 'react-native-maps';

import { LISTMARGIN, HEADERHEIGHT } from '../constants';

import { Screen } from '../components/Screen';
import { Card } from '../components/Card';
import { AnimatedListHeader } from '../components/AnimatedListHeader';
import { Map } from '../components/Map';

import { properties } from '../data/properties';

const SearchScreen = () => {
 
  const navigation = useNavigation()

  const [scrollAnimation] = useState(new Animated.Value(0))
  const [mapShown, setMapShown] = useState<boolean>(false)

  return (
    <Screen>
      <AnimatedListHeader scrollAnimation={scrollAnimation} setMapShown={setMapShown} mapShown={mapShown}/>
      {
        mapShown ? (
          <Map properties={properties}/>
        ) :
          (<Animated.FlatList
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
            keyExtractor={(item) => item.ID.toString()}
            showsHorizontalScrollIndicator={false}
            style={{ marginHorizontal: LISTMARGIN }}
            renderItem={({ item, index }) => <Card
              style={styles.card}
              property={item}
              onPress={() =>
                navigation.navigate("PropertyDetails", {
                  propertyID: item.ID,
                })
              } />}
          />
          )
      }
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