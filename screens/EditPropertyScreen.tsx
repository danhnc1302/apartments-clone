import React from "react";
import {
  StyleSheet,
  View
} from "react-native";
import { Text, Button, Input } from "@ui-kitten/components";
import axios from "axios";
import {
  useQuery,
  UseQueryResult,
  useMutation,
  useQueryClient,
} from "react-query";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import { useState, useRef } from "react";
import RNPhoneInput from "react-native-phone-number-input";
import { PickerItem } from "react-native-woodpicker/dist/types";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";

import { Loading } from "../components/Loading";
import { Screen } from "../components/Screen";
import { UnitPhotosPicker } from "../components/UnitPhotosPicker";
import { UnitAmenities } from "../components/UnitAmenities";
import { UnitDescription } from "../components/UnitDescription";
import { UnitsInput } from "../components/EditPropertySections/UnitsInput";
import { GeneralPropertyInfo } from "../components/EditPropertySections/GeneralPropertyInfo";
import { ContactInfo } from "../components/EditPropertySections/ContactInfo";
import { UtilitiesAndAmenities } from "../components/UtilitiesAndAmenities";
import { Row } from "../components/Row";
import { Select } from "../components/Select";

import { EditPropertyObj, Property } from "../types/property";
import { theme } from "../theme";
import { useUser } from "../hooks/useUser";

import { bedValues } from "../constants/bedValues";
import { bathValues } from "../constants/bathValues";
import { petValues } from "../constants/petValues";
import { laundryValues } from "../constants/laundryValues";
import {
  AMENITIES_STR,
  DESCRIPTION_STR,
  endpoints,
  PHOTOS_STR,
  queryKeys,
} from "../constants";
import { TempApartment } from "../types/tempApartment";

const EditPropertyScreen = ({
  route,
}: {
  route: { params: { propertyID: number } };
}) => {

  const scrollViewRef = useRef<KeyboardAwareScrollView | null>(null);
  const phoneRef = useRef<RNPhoneInput>(null);
  const [showAlternateScreen, setShowAlternateScreen] = useState("");
  const [apartmentIndex, setApartmentIndex] = useState<number>(-1);
  const { user } = useUser();

  const handleShowAlternateScreen = (index: number, name: string) => {
    if (scrollViewRef.current) scrollViewRef.current.scrollToPosition(0, 0);
    setShowAlternateScreen(name);
    setApartmentIndex(index);
  };

  const handleHideAlternateScreen = () => {
    setShowAlternateScreen("");
    setApartmentIndex(-1);
  };

  const property: UseQueryResult<{ data: Property }, unknown> = useQuery(
    "property",
    () => axios.get(endpoints.getPropertyByUserId + route.params.propertyID)
  );

  const propertyData = property.data?.data;

  let initialApartments: TempApartment[] = [];
  if (propertyData) {
    for (let i of propertyData.apartments) {
      initialApartments.push({
        ID: i.ID,
        unit: i.unit ? i.unit : "",
        bedrooms: bedValues.filter((item) => item.value === i.bedrooms)[0],
        bathrooms: bathValues.filter((item) => item.value === i.bathrooms)[0],
        sqFt: i.sqFt ? i.sqFt.toString() : "",
        rent: i.rent ? i.rent.toString() : "",
        deposit: "0",
        leaseLength: "12 Months",
        availableOn: new Date(),
        active: true,
        showCalendar: false,
        images: [],
        amenities: [],
        description: "",
      });
    }
  }

  if (property.isFetching || property.isLoading) return <Loading />

  return (
    <Screen >
      <KeyboardAwareScrollView
        bounces={false}
        ref={(ref) => (scrollViewRef.current = ref)}
        style={styles.container}
      >
        {!showAlternateScreen && (
          <Text category="h5" style={styles.header}>
            Basic Info
          </Text>
        )}
        <View>
          <Formik
            initialValues={{
              unitType: propertyData?.unitType,
              apartments: initialApartments,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => console.log(values)}
          >
            {({
              values,
              errors,
              touched,
              handleSubmit,
              setFieldTouched,
              setFieldValue,
              handleChange,
            }) => {
              return (
                <>
                  {
                    values.apartments.map((i, index) => {
                      return (
                        <View>
                          {
                            values.apartments.length > 1 ? (
                              <Input
                                style={styles.input}
                                value={i.unit}
                                onChangeText={handleChange(`apartments[${index}].unit`)}
                                label="Unit"
                                placeholder="Unit No."
                                onBlur={() => setFieldTouched(`apartments[${index}].unit`)}
                                caption={
                                  touched.apartments &&
                                    errors.apartments &&
                                    (errors.apartments[index] as any)?.unit ? (errors.apartments[index] as any)?.unit : undefined
                                }
                                status={
                                  touched.apartments && errors.apartments && (errors.apartments[index] as any)?.unit ? "danger" : "basic"
                                }
                              >
                              </Input>
                            ) : null
                          }
                          <Row style={[styles.input, styles.unitRow]}>
                            <Select
                              label="Beds"
                              item={i.bedrooms}
                              items={bedValues}
                              onItemChange={(item) => {
                                setFieldValue(`apartments[${index}].bedrooms`,item)
                              }}
                              isNullable={false}
                              style={styles.smallInput}
                            />
                          </Row>
                        </View>
                      )
                    })
                  }
                </>
              )
            }
            }
          </Formik>
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  );
};

export default EditPropertyScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  header: {
    textAlign: "center",
    paddingVertical: 10,
  },
  saveButton: {
    borderColor: theme["color-primary-500"],
    marginVertical: 15,
  },
  largeMarginTop: {
    marginTop: 30
  },
  input: {
    marginTop: 15
  },
  unitRow: {
    justifyContent: "space-between"
  },
  smallInput: {
    width: "45%"
  }
});

const validationSchema = yup.object().shape({
  unitType: yup.string().required(),
  apartments: yup.array().when("unitType", {
    is: "multiple",
    then: yup.array(
      yup.object().shape({
        unit: yup.string().required("Required"),
        bedrooms: yup.object().shape({
          label: yup.string().required("Required"),
          value: yup.string().required("Required"),
        }),
        bathrooms: yup.object().shape({
          label: yup.string().required("Required"),
          value: yup.string().required("Required"),
        }),
        sqFt: yup.string().required("Required"),
        rent: yup.string().required("Required"),
        deposit: yup.string().required("Required"),
        leaseLength: yup.string().required("Required"),
        availableOn: yup.date().required("Required"),
        active: yup.boolean().required("Required"),
        showCalendar: yup.boolean(),
        images: yup.array().of(yup.string()),
        amenities: yup.array().of(yup.string()),
        description: yup.string(),
      })
    ),
    otherwise: yup.array(
      yup.object().shape({
        unit: yup.string(),
        bedrooms: yup.object().shape({
          label: yup.string().required("Required"),
          value: yup.string().required("Required"),
        }),
        bathrooms: yup.object().shape({
          label: yup.string().required("Required"),
          value: yup.string().required("Required"),
        }),
        sqFt: yup.string().required("Required"),
        rent: yup.string().required("Required"),
        deposit: yup.string().required("Required"),
        leaseLength: yup.string().required("Required"),
        availableOn: yup.date().required("Required"),
        active: yup.boolean().required("Required"),
        showCalendar: yup.boolean(),
        images: yup.array().of(yup.string()),
        amenities: yup.array().of(yup.string()),
        description: yup.string(),
      })
    ),
  }),
  description: yup.string(),
  images: yup.array().of(yup.string()),
  includedUtilities: yup.array().of(yup.string()),
  petsAllowed: yup.object().shape({
    label: yup.string().required("Required"),
    value: yup.string().required("Required"),
  }),
  laundryType: yup.object().shape({
    label: yup.string().required("Required"),
    value: yup.string().required("Required"),
  }),
  parkingFee: yup.string(),
  amenities: yup.array().of(yup.string()),
  name: yup.string(),
  firstName: yup.string(),
  lastName: yup.string(),
  email: yup.string().required("Required"),
  callingCode: yup.string(),
  countryCode: yup.string(),
  phoneNumber: yup.string().required("Required"),
  website: yup.string().url(),
  onMarket: yup.boolean().required(),
});