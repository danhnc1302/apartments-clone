import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Divider } from "@ui-kitten/components";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Property } from '../types/property';
import { theme } from '../theme';

import { Row } from './Row';
import { callPhoneNumber } from '../utils/callPhoneNumber';
import { getStateAbbreviation } from "../utils/getStateAbbreviation";

export const CardInformation = ({
  property,
  myProperty
}: {
  property: Property,
  myProperty?: boolean
}) => {

  const navigation = useNavigation();

  const manageUnitsNavigation = () =>
    navigation.navigate("ManageUnits", { propertyID: property.ID });

  const emailNavigation = () =>
    navigation.navigate("MessageProperty", { propertyID: property.ID });

  const editPropertyNavigation = () =>
    navigation.navigate("EditProperty", { propertyID: property.ID });

  const handleHeartPress = () => {
    
  };

  const DefaultInfo = () => {
    return (
      <>
        {property?.rentLow && property?.rentHigh &&
          <Row style={styles.rowJustification}>
            <Text style={{ fontSize: 20, fontWeight: "500" }}>${property.rentLow.toLocaleString()} - {property.rentHigh.toLocaleString()}</Text>
            <MaterialCommunityIcons name="heart-outline" size={24} color={theme["color-primary-500"]} />
          </Row>}
        <Text>{property.bedroomLow === 0 ? "Studio" : property.bedroomLow} - {property.bedroomHigh} Beds</Text>
        <Text style={styles.defaultMarginTop}>{property.name}</Text>
        <Text>{property.street}</Text>
        <Text>{property.city}, {property.state} {property.zip}</Text>
        {
          property?.tags ? (
            <Text style={styles.defaultMarginTop}>{property.tags.map((tag: any, index: any) => index === property.tags.length ? tag : `${tag}`)}</Text>
          ) : null
        }
        <Row style={[styles.defaultMarginTop, styles.rowJustification]}>
          <Button appearance='ghost'
            style={[styles.button, { borderColor: theme["color-primary-500"] }]}
            size="small"
            onPress={() => navigation.navigate("MessageProperty", { propertyID: property.ID })}
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
      </>
    )
  }

  const MyPropertyInfo = () => (
    <>
      <Text category={"s1"}>
        {property?.name
          ? property.name
          : `${property.street}, ${property.city}, ${getStateAbbreviation(
            property.state
          )} ${property.zip}`}
      </Text>
      <Row style={[styles.rowAlign, styles.defaultMarginTop]}>
        {property?.apartments && property.apartments.length > 0 ? (
          <Text category={"c1"}>
            {property.apartments.length}{" "}
            {property.apartments.length > 1 ? "Units" : "Unit"}
          </Text>
        ) : null}
        <Button
          appearance={"ghost"}
          status="info"
          size={"small"}
          onPress={manageUnitsNavigation}
        >
          Manage Units
        </Button>
      </Row>

      <Divider style={styles.divider} />

      <Row
        style={[
          styles.defaultMarginTop,
          styles.rowJustification,
          styles.rowAlign,
        ]}
      >
        <Text category={"s2"}>
          Listing: {property?.onMarket ? "On Market" : "Off Market"}
        </Text>
        <Button
          size={"small"}
          appearance="ghost"
          status={"info"}
          onPress={editPropertyNavigation}
        >
          {property?.onMarket ? "Deactivate" : "Reactivate"}
        </Button>
      </Row>
    </>
  );

  return (
    <View style={styles.informationContainer}>
      {
        myProperty ? <MyPropertyInfo /> : <DefaultInfo />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  informationContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: theme["color-gray"],
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  defaultMarginTop: {
    marginTop: 5,
  },
  divider: {
    backgroundColor: theme["color-gray"],
  },
  rowAlign: { alignItems: "center" },
  rowJustification: {
    justifyContent: "space-between",
  },
  button: {
    width: "49%",
  },
  heartContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 5,
  },
})