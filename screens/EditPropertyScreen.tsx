import React, { useState, useRef } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,

} from "react-native";
import { Text, Button, Input, Divider, Toggle } from "@ui-kitten/components";
import axios from "axios";
import {
  useQuery,
  UseQueryResult,
  useMutation,
  useQueryClient,
} from "react-query";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import RNPhoneInput from "react-native-phone-number-input";
import { PickerItem } from "react-native-woodpicker/dist/types";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";
import DateTimePicker from "react-native-modal-datetime-picker";

import { Loading } from "../components/Loading";
import { Screen } from "../components/Screen";
import { UnitPhotosPicker } from "../components/UnitPhotosPicker";
import { UnitAmenities } from "../components/UnitAmenities";
import { UnitDescription } from "../components/UnitDescription";
import { UnitsInput } from "../components/EditPropertySections/UnitsInput";
import { GeneralPropertyInfo } from "../components/EditPropertySections/GeneralPropertyInfo";
import { ContactInfo } from "../components/EditPropertySections/ContactInfo";
import { UtilitiesAndAmenities } from "../components/UtilitiesAndAmenities";
import { PressableInput } from "../components/PressableInput";
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
import { MaterialIcons } from "@expo/vector-icons";

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

              const addUnit = () => {
                const apartments = [...values.apartments]
                apartments.push({
                  unit: "",
                  bedrooms: bedValues[0],
                  bathrooms: bathValues[0],
                  sqFt: "",
                  rent: "",
                  deposit: "0",
                  leaseLength: "12 Months",
                  availableOn: new Date(),
                  active: true,
                  showCalendar: false,
                  images: [],
                  amenities: [],
                  description: "",
                });
                setFieldValue("apartments", apartments);
              }

              const removeUnit = (index: number) => {
                const newApartments = values.apartments.filter((i, idx) => idx !== index);
                setFieldValue("apartments", newApartments);
              }

              if (showAlternateScreen === PHOTOS_STR && apartmentIndex > -1) {
                return <UnitPhotosPicker
                  setImages={setFieldValue}
                  images={values.apartments[apartmentIndex].images}
                  field={`apartments[${apartmentIndex}].images`}
                  cancel={handleHideAlternateScreen}
                />
              }
              if (showAlternateScreen === AMENITIES_STR && apartmentIndex > -1) {
                return <UnitAmenities
                  setAmenities={setFieldValue}
                  amenities={values.apartments[apartmentIndex].amenities}
                  field={`apartments[${apartmentIndex}].amenities`}
                  cancel={handleHideAlternateScreen}
                />
              }

              if (showAlternateScreen === DESCRIPTION_STR && apartmentIndex > -1) {
                return <UnitDescription
                  setDescription={setFieldValue}
                  description={values.apartments[apartmentIndex].description}
                  field={`apartments[${apartmentIndex}].description`}
                  cancel={handleHideAlternateScreen}
                />
              }

              return (
                <>
                  {
                    values.apartments.map((i, index) => {
                      return (
                        <View key={i.unit + index}>
                          {
                            values.apartments.length > 1 ? (
                              <>
                                {
                                  property.data?.data.apartments && index >= property.data?.data.apartments.length ? (
                                    <TouchableOpacity
                                      style={styles.removeUnit}
                                      onPress={() => removeUnit(index)}
                                    >
                                      <Text
                                        style={styles.removeUnitText}
                                        status={"info"}
                                        category={"c1"}
                                        appearance={"hint"}
                                      >
                                        Remove Unit
                                      </Text>
                                    </TouchableOpacity>
                                  ) : null
                                }
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
                              </>
                            ) : null
                          }
                          <Row style={[styles.input, styles.unitRow]}>
                            <Select
                              label="Beds"
                              item={i.bedrooms}
                              items={bedValues}
                              onItemChange={(item) => {
                                setFieldValue(`apartments[${index}].bedrooms`, item)
                              }}
                              isNullable={false}
                              style={styles.smallInput}
                            />
                            <Select
                              label="Baths"
                              item={i.bathrooms}
                              items={bathValues}
                              onItemChange={(item) => {
                                setFieldValue(`apartments[${index}].bathrooms`, item)
                              }}
                              isNullable={false}
                              style={styles.smallInput}
                            />
                          </Row>
                          <Input
                            style={styles.input}
                            value={i.sqFt as string}
                            onChangeText={handleChange(`apartments[${index}].sqFt`)}
                            label="Sq Ft"
                            placeholder="SF"
                            keyboardType="number-pad"
                            onBlur={() => setFieldTouched(`apartments[${index}].sqFt`)}
                            caption={
                              touched.apartments &&
                                (touched.apartments[index] as any)?.sqFt &&
                                errors.apartments &&
                                (errors.apartments[index] as any)?.sqFt
                                ? (errors.apartments[index] as any)?.sqFt
                                : undefined
                            }
                            status={
                              touched.apartments &&
                                (touched.apartments[index] as any)?.sqFt &&
                                errors.apartments &&
                                (errors.apartments[index] as any)?.sqFt
                                ? "danger"
                                : "basic"
                            }
                          />
                          <Row style={[styles.input, styles.unitRow]}>
                            <Input
                              style={styles.smallInput}
                              label={"Rent"}
                              placeholder="$/mo"
                              keyboardType="number-pad"
                              value={i.rent as string}
                              onChangeText={handleChange(`apartments[${index}].rent`)}
                              onBlur={() => setFieldTouched(`apartments[${index}].rent`)}
                              caption={
                                touched.apartments &&
                                  (touched.apartments[index] as any)?.rent &&
                                  errors.apartments &&
                                  (errors.apartments[index] as any)?.rent
                                  ? (errors.apartments[index] as any)?.rent
                                  : undefined
                              }
                              status={
                                touched.apartments &&
                                  (touched.apartments[index] as any)?.rent &&
                                  errors.apartments &&
                                  (errors.apartments[index] as any)?.rent
                                  ? "danger"
                                  : "basic"
                              }
                            />
                            <Input
                              style={styles.smallInput}
                              label={"Deposit"}
                              keyboardType="number-pad"
                              value={i.deposit as string}
                              onChangeText={handleChange(`apartments[${index}].deposit`)}
                              onBlur={() => setFieldTouched(`apartments[${index}].deposit`)}
                              caption={
                                touched.apartments &&
                                  (touched.apartments[index] as any)?.deposit &&
                                  errors.apartments &&
                                  (errors.apartments[index] as any)?.deposit
                                  ? (errors.apartments[index] as any)?.deposit
                                  : undefined
                              }
                              status={
                                touched.apartments &&
                                  (touched.apartments[index] as any)?.deposit &&
                                  errors.apartments &&
                                  (errors.apartments[index] as any)?.deposit
                                  ? "danger"
                                  : "basic"
                              }
                            />
                          </Row>
                          <Row style={[styles.input, styles.unitRow]}>
                            <Input
                              style={styles.smallInput}
                              label={"Lease Length"}
                              value={i.leaseLength}
                              placeholder="12 Months"
                              onChangeText={handleChange(`apartments[${index}].leaseLength`)}
                              onBlur={() =>
                                setFieldTouched(`apartments[${index}].leaseLength`)
                              }
                              caption={
                                touched.apartments &&
                                  (touched.apartments[index] as any)?.leaseLength &&
                                  errors.apartments &&
                                  (errors.apartments[index] as any)?.leaseLength
                                  ? (errors.apartments[index] as any)?.leaseLength
                                  : undefined
                              }
                              status={
                                touched.apartments &&
                                  (touched.apartments[index] as any)?.leaseLength &&
                                  errors.apartments &&
                                  (errors.apartments[index] as any)?.leaseLength
                                  ? "danger"
                                  : "basic"
                              }
                            />
                            <PressableInput
                              style={styles.smallInput}
                              onPress={() =>
                                setFieldValue(`apartments[${index}].showCalendar`, true)
                              }
                              value={i.availableOn.toDateString()}
                              label={"Available On"}
                            />
                            <DateTimePicker
                              isVisible={i.showCalendar}
                              mode="date"
                              onConfirm={(selectedDate: Date) => {
                                if (selectedDate) {
                                  setFieldValue(
                                    `apartments[${index}].availableOn`,
                                    selectedDate
                                  );
                                  setFieldValue(`apartments[${index}].showCalendar`, false);
                                }
                              }}
                              onCancel={() =>
                                setFieldValue(`apartments[${index}].showCalendar`, false)
                              }
                            />
                          </Row>
                          <Divider style={styles.divider} />
                          <TouchableOpacity
                            onPress={() => handleShowAlternateScreen(index, PHOTOS_STR)}
                          >
                            <Text status={"info"}>Unit Photos</Text>
                          </TouchableOpacity>
                          <Divider style={styles.divider} />
                          <TouchableOpacity
                            onPress={() => handleShowAlternateScreen(index, AMENITIES_STR)}
                          >
                            <Text status={"info"}>Unit Amenities</Text>
                          </TouchableOpacity>
                          <Divider style={styles.divider} />
                          <TouchableOpacity
                            onPress={() => handleShowAlternateScreen(index, DESCRIPTION_STR)}
                          >
                            <Text status={"info"}>Unit Description</Text>
                          </TouchableOpacity>
                          <Divider style={styles.divider} />
                          <Row style={styles.toggleRow}>
                            <Text>Active</Text>
                            <Toggle
                              checked={values.apartments[index].active}
                              onChange={(isChecked) => {
                                setFieldValue(
                                  `apartments[${index}].active`,
                                  isChecked
                                )
                              }}
                            />
                          </Row>
                          <Divider style={styles.divider} />
                          {
                            index + 1 === values.apartments?.length ? (
                              <>
                                <TouchableOpacity
                                  style={styles.addUnit}
                                  onPress={addUnit}
                                >
                                  <MaterialIcons
                                    name="add-circle-outline"
                                    size={20}
                                    color={theme["color-info-500"]}
                                  />
                                  <Text status={"info"} style={styles.addUnitText}>
                                    Add Another Unit
                                  </Text>
                                </TouchableOpacity>
                                <Divider style={styles.divider} />
                              </>
                            ) : null
                          }
                        </View>
                      )
                    })
                  }
                  <Button onPress={() => {
                    console.log(values.apartments[0].amenities)
                    return handleSubmit()
                  }} style={styles.button}>
                    Submit
                  </Button>
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
  },
  divider: {
    backgroundColor: theme["color-gray"],
    marginVertical: 10
  },
  toggleRow: {
    justifyContent: "space-between",
    alignItems: "center"
  },
  addUnit: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 20
  },
  addUnitText: {
    marginLeft: 10
  },
  removeUnit: {
    position: "absolute",
    right: 5,
    zIndex: 10,
    top: 16
  },
  removeUnitText: {
    fontWeight: "bold"
  },
  button: {
    marginBottom: 20
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
        sqFt: yup.string(),
        rent: yup.string(),
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