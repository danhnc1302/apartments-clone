import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,

} from "react-native";
import { Text, Button } from "@ui-kitten/components";
import axios from "axios";
import {
  useQuery,
  UseQueryResult,
} from "react-query";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import RNPhoneInput from "react-native-phone-number-input";
import * as yup from "yup";

import { Loading } from "../components/Loading";
import { Screen } from "../components/Screen";
import { UnitPhotosPicker } from "../components/UnitPhotosPicker";
import { UnitAmenities } from "../components/UnitAmenities";
import { UnitDescription } from "../components/UnitDescription";
import { UnitsInput } from "../components/EditPropertySections/UnitsInput";
import { GeneralPropertyInfo } from "../components/EditPropertySections/GeneralPropertyInfo";

import { useUser } from "../hooks/useUser";

import { bedValues } from "../constants/bedValues";
import { bathValues } from "../constants/bathValues";
import {
  AMENITIES_STR,
  DESCRIPTION_STR,
  endpoints,
  PHOTOS_STR,
  queryKeys,
} from "../constants";
import { Property } from "../types/property";
import { TempApartment } from "../types/tempApartment";
import { DescriptionInput } from "../components/DescriptionInput";
import { UtilitiesAndAmenities } from "../components/EditPropertySections/UtilitiesAndAmenities ";
import { petValues } from "../constants/petValues";
import { laundryValues } from "../constants/laundryValues";
import { ContactInfo } from "../components/EditPropertySections/ContactInfo";
import { theme } from "../theme";

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
              description: "",
              images: [],
              includedUtilities: [],
              petsAllowed: petValues[0],
              laundryType: laundryValues[0],
              parkingFee: "",
              amenities: [],
              name: propertyData?.name ?? "",
              firstName: user?.firstName ? user.firstName : "",
              lastName: user?.lastName ? user.lastName : "",
              email: user ? user.email : "",
              phoneNumber: "",
              onMarket: false,
              website: "",
              countryCode: "",
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
                  <UnitsInput
                    unitType={values.unitType}
                    apartments={values.apartments}
                    property={property.data?.data}
                    touched={touched}
                    errors={errors}
                    setFieldTouched={setFieldTouched}
                    setFieldValue={setFieldValue}
                    handleChange={handleChange}
                    handleShowAlternateScreen={handleShowAlternateScreen}
                  />
                  <GeneralPropertyInfo
                    images={values.images}
                    description={values.description}
                    setFieldValue={setFieldValue}
                  />
                  <UtilitiesAndAmenities
                    amenities={values.amenities}
                    handleChange={handleChange}
                    includedUtilities={values.includedUtilities}
                    laundryType={values.laundryType}
                    parkingFee={values.parkingFee}
                    petsAllowed={values.petsAllowed}
                    setFieldValue={setFieldValue}
                  />
                  <ContactInfo
                    name={values.name}
                    email={values.email}
                    errors={errors}
                    firstName={values.firstName}
                    website={values.website}
                    handleChange={handleChange}
                    lastName={values.lastName}
                    phoneNumber={values.phoneNumber}
                    countryCode={values.countryCode}
                    phoneRef={phoneRef}
                    setFieldTouched={setFieldTouched}
                    touched={touched}
                  />
                  <Button onPress={() => {
                    console.log(values)
                    return handleSubmit()
                  }} style={styles.saveButton}>
                    Save
                  </Button>
                  <Button
                    appearance={"ghost"}
                    style={[styles.publishButton]}
                    onPress={() => {
                      if (propertyData?.onMarket)
                        setFieldValue("onMarket", false);
                      else setFieldValue("onMarket", true);
                      handleSubmit();
                    }}
                  >
                    {propertyData?.onMarket
                      ? "Unpublish Listing"
                      : "Publish Listing"}
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
  publishButton: {
    borderColor: theme["color-primary-500"],
    marginBottom: 15,
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