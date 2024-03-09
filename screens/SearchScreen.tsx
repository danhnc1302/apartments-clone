import React, { useState, useRef, useEffect } from 'react'
import {
  Animated,
  StyleSheet,
  View
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import MapView from 'react-native-maps';
import LottieView from 'lottie-react-native';
import { LISTMARGIN, HEADERHEIGHT } from '../constants';
import { Text } from '@ui-kitten/components';
import { Screen } from '../components/Screen';
import { Card } from '../components/Card';
import { AnimatedListHeader } from '../components/AnimatedListHeader';
import { getPropertiesInArea } from '../data/properties';
import { Map } from '../components/Map';
import { SearchScreenParams } from '../types';
import { Property } from '../types/property';


const SearchScreen = ({
  route,
}: {
  route: { params: SearchScreenParams };
}) => {

  const navigation = useNavigation();
  const [scrollAnimation] = useState(new Animated.Value(0));
  const [mapShown, setMapShown] = useState<boolean>(false);
  const mapRef = useRef<MapView | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [location, setLocation] = useState<string | undefined>(undefined)


  useEffect(() => {
    if (route.params) {
      const numBoundingBox = [
        Number(route.params.boundingBox[0]),
        Number(route.params.boundingBox[1]),
        Number(route.params.boundingBox[2]),
        Number(route.params.boundingBox[3]),
      ]
      setLocation(route.params.location);
      setProperties(getPropertiesInArea(numBoundingBox));
      mapRef?.current?.animateCamera({
        center: {
          latitude: Number(route.params.lat),
          longitude: Number(route.params.lon)
        }
      })
    };
  }, [route])

  const animation = useRef(null);

  return (
    <Screen>
      <AnimatedListHeader
        scrollAnimation={scrollAnimation}
        setMapShown={setMapShown}
        mapShown={mapShown}
        location={route.params ? route.params.location : "Find a location"}
        availableProperties={properties ? properties.length : undefined}
      />
      {
        mapShown ? (
          <Map
            properties={properties}
            mapRef={mapRef}
            initialRegion={
              route.params ? {
                latitude: Number(route.params.lat),
                longitude: Number(route.params.lon),
                latitudeDelta: 0.4,
                longitudeDelta: 0.4
              } : undefined
            }
          />
        ) : (
          <>
            {
              properties.length > 0 ? (
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
              ) : (
                <>
                  {
                    route.params ? (
                      <View style={styles.lottieContainer}>
                        <Text category={"h6"}>No Properties Found</Text>
                        <Text appearance={"hint"}>Please search in a difference location.</Text>
                      </View>
                    ) : (
                      <View style={styles.lottieContainer}>
                        <LottieView
                          autoPlay
                          loop
                          ref={animation}
                          style={styles.lottie}
                          source={require('../assets/lotties/SearchScreen.json')}
                        />
                        <Text category={"h6"}>Begin Your Search</Text>
                        <Text appearance={"hint"}>Find apartments anytime and anywhere.</Text>
                      </View>
                    )
                  }
                </>

              )
            }
          </>
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