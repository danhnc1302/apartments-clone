import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useQueryClient } from "react-query";
import { Screen } from "../components/Screen";
import { ModalHeader } from "../components/ModalHeader";
import { CurrentLocationButton } from '../components/CurrentLocationButton';
import { RecentSearchList } from "../components/RecentSearchList";
import { SearchAddress } from "../components/SearchAddress";

import { theme } from "../theme";
import { Location } from "../types/locationIQ";
import { getFormattedLocationText } from "../utils/getFormattedLocationText";

const FindLocationsScreen = () => {
  const navigation = useNavigation();
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const queryClient = useQueryClient();
  const recentSearches: Location[] | undefined = queryClient.getQueryData("recentSearches")

  const setRecentSearch = (location: Location) => {
    queryClient.setQueryData("recentSearches", () => {
      if (recentSearches) {
        let included = false;
        for (let i of recentSearches) {
          if (
            i.display_name === location.display_name &&
            i.lon === location.lon &&
            i.lat === location.lat
          ) {
            included = true;
            break;
          }
        }
        if (!included) return [location, ...recentSearches];
      }
      return [location];
    })
  }

  const handleNavigate = (location: Location) => {
    setRecentSearch(location)
    navigation.navigate("Root", {
      screen: "Search",
      params: {
        location: getFormattedLocationText(location, 'autocomplete'),
        lat: location.lat,
        lon: location.lon,
        boundingBox: location.boundingbox,
      },
    })
  }

  return (
    <Screen>
      {Platform.OS === "ios" ? <ModalHeader /> : null}
      <View style={styles.screenContent}>
        <SearchAddress
          type="autocomplete"
          handleGoBack={() => navigation.goBack()}
          suggestions={suggestions}
          setSuggestions={(item) => setSuggestions(item as Location[])}
          handleSuggestionPress={(item) => handleNavigate(item as Location)}
        />
        {suggestions.length === 0 ? (
          <ScrollView bounces={false}>
            <CurrentLocationButton style={styles.currentLocationButton} />
            <RecentSearchList style={styles.recentSearchContainer} recentSearches={recentSearches} />
          </ScrollView>
        ) : null}
      </View>
    </Screen>
  );
};

export default FindLocationsScreen;

const styles = StyleSheet.create({
  screenContent: {
    marginHorizontal: 10,
  },
  defaultMarginTop: {
    marginTop: 10,
  },
  suggestionContainer: {
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme["color-gray"],
  },
  currentLocationButton: {
    marginTop: 40,
  },
  recentSearchContainer: {
    marginTop: 30
  },
});