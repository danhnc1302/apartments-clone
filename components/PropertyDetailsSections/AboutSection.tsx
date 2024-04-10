import React from "react";
import { 
    View,
    StyleSheet 
} from "react-native";
import { Text } from "@ui-kitten/components";
import { 
    MaterialIcons,
    MaterialCommunityIcons
} from "@expo/vector-icons";

import { Row } from "../Row";
import { BulletedList } from "../BulletedList";
import { Property } from "../../types/property";

export const AboutSection = ({ property }: { property: Property }) => {
  if (property.about)
    return (
      <>
        <Text category={"h5"} style={styles.header}>
          About
        </Text>
        <Row>
            <MaterialIcons color={"#36454f"} size={24} name="apartment"/>
            <Text category={"h6"} style={styles.apartmentText}>
                {property.name}
            </Text>
        </Row>
        <Text category={"c1"}>{property.about}</Text>
        <>
            <Row style={styles.row}>
                <MaterialCommunityIcons name="star-outline" size={26} color="black"/>
                <Text category={"h6"} style={styles.featuresText}>
                    Unique features
                </Text>
            </Row>
            <View style={styles.bulletedListContainer}>
                {
                    property.features ? (
                        <BulletedList data={[...property.tags, ...property.features]}/>
                    ) : (
                        <BulletedList data={property.tags}/>
                    )
                }
            </View>
        </>
      </>
    );

  return null;
};

const styles = StyleSheet.create({
  header: { 
    marginBottom: 15, 
    marginTop: 10 
  },
  apartmentText: { 
    paddingLeft: 10, 
    marginBottom: 10 
  },
  row: {
    alignItems: "center",
    marginTop: 10
  },
  bulletedListContainer: {
    paddingHorizontal: 5
  },
  featuresText: {
    paddingLeft: 10
  }
});