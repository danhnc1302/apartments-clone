import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from "@ui-kitten/components";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Property } from '../types/property';
import { theme } from '../theme';

import { Row } from './Row';
import { callPhoneNumber } from '../utils/callPhoneNumber';


export const CardInformation = ({ property }: { property: Property }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.informationContainer}>
      <Row style={styles.rowJustification}>
        <Text style={{ fontSize: 20, fontWeight: "500" }}>${property.rentLow.toLocaleString()} - {property.rentHigh.toLocaleString()}</Text>
        <MaterialCommunityIcons name="heart-outline" size={24} color={theme["color-primary-500"]} />
      </Row>
      <Text>{property.bedroomLow === 0 ? "Studio" : property.bedroomLow} - {property.bedroomHigh} Beds</Text>
      <Text style={styles.defaultMarginTop}>{property.name}</Text>
      <Text>{property.street}</Text>
      <Text>{property.city}, {property.state} {property.zip}</Text>
      <Text style={styles.defaultMarginTop}>{property.tags.map((tag: any, index: any) => index === property.tags.length ? tag : `${tag}`)}</Text>
      <Row style={[styles.defaultMarginTop, styles.rowJustification]}>
        <Button appearance='ghost' 
          style={[styles.button, { borderColor: theme["color-primary-500"] }]} 
          size="small" 
          onPress={() => navigation.navigate("MessageProperty", {propertyID: property.ID})}
        >
          Email
        </Button>
        <Button 
          size="small" 
          style={styles.button} 
          onPress={() => callPhoneNumber(property.phoneNumber)}>
          Call
        </Button>
      </Row>
    </View>
  )
}

const styles = StyleSheet.create({
  informationContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  button: {
    width: "49%"
  },
  defaultMarginTop: {
    marginTop: 5
  },
  rowJustification: {
    justifyContent: "space-between"
  }
})