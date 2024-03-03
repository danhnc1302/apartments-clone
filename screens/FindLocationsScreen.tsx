import { useState } from "react";
import {
  Platform,
  StyleSheet,
  View,
  ScrollView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, Input, Text } from "@ui-kitten/components";
import { Screen } from "../components/Screen";
import { ModalHeader } from "../components/ModalHeader";
import { theme } from "../theme";
import { Location } from "../types/locationIQ";
import { Row } from "../components/Row";


import { getSuggestedLocations } from "../services/location";

const FindLocationsScreen = () => {
  const navigation = useNavigation();
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [value, setValue] = useState("")

  const handleChange = async (val: string) => {
    setValue(val)
    if (val.length > 2) {
      const locations = await getSuggestedLocations(val);
      if (locations.length > 0) {
        setSuggestions(locations);
      } else if (val.length === 0) {
        setSuggestions([]);
      }
    }
  }

  const handleSubmitEditing = async () => {
    const locations = await getSuggestedLocations(value);
    if (locations.length > 0) {
      console.log("navigation to search screen passing in", locations[0]);
    }
  }

  const getInput = () => {
    if (Platform.OS === "ios") {
      return (
        <Input
          keyboardType="default"
          autoFocus
          selectionColor={theme["color-primary-500"]}
          placeholder="Enter your location"
          size={"large"}
          value={value}
          onChangeText={handleChange}
          onSubmitEditing={handleSubmitEditing}
          style={styles.defaultMarginTop}
        />
      );
    };

    return (
      <Row style={{ alignItems: "center" }}>
        <Input
          keyboardType="default"
          autoFocus
          selectionColor={theme["color-primary-500"]}
          placeholder="Enter your location"
          size={"large"}
          value={value}
          onChangeText={handleChange}
          onSubmitEditing={handleSubmitEditing}
          style={[styles.defaultMarginTop, { flex: 1 }]}
        />
        <Button appearance={"ghost"} status="info" onPress={navigation.goBack} style={styles.defaultMarginTop}>
          Cancel
        </Button>
      </Row>
    )

  }
  return (
    <Screen>
      {Platform.OS === "ios" ? <ModalHeader /> : null}
      <View style={styles.screenContent}>
        {getInput()}
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
  recentSearchContainer: { marginTop: 30 },
});