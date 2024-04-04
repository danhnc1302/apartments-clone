import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  ViewStyle,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Modal, Button } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQueryClient } from 'react-query';
import { Property } from '../types/property';

import { ImageCarousel } from './ImageCarousel';
import { CardInformation } from './CardInformation';
import { LISTMARGIN, endpoints } from '../constants';
import { theme } from '../theme';
import axios from 'axios';

export const Card = ({
  property,
  onPress,
  myProperty,
  style,
}: {
  property: Property;
  onPress?: () => void;
  myProperty: boolean;
  style?: ViewStyle;
}) => {

  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState<boolean>(true);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const deleteProperty = useMutation(
    () => axios.delete(`${endpoints.deletePeoperty}${property.ID}`),
    {
      onMutate: async () => {
        await queryClient.cancelQueries("myproperties");
        const prevProperties: { data: Property[]} | undefined = queryClient.getQueryData("myProperties");
        if(prevProperties) {
          const filtered = prevProperties.data.filter((i) => i.ID !== property.ID);
        }
        return { prevProperties }
      },
      onError(err, newTodo, context) {
          if(context?.prevProperties) {
            queryClient.setQueryData(
              "myproperties",
              context?.prevProperties.data
            )
          }
      },
      onSettled: () => {
        queryClient.invalidateQueries("myproperties");
      }
    }
  )

  const handleEditProperty = () => {
    navigation.navigate("EditProperty", { propertyID: property.ID }); 
    closeModal();
  }

  const handleDeleteProperty = () => {
    deleteProperty.mutate();
    closeModal();
  }

  return (
    <Pressable onPress={onPress} style={[style, styles.container]}>
      <ImageCarousel onImagePress={onPress} images={property.images} chevronsShown={true} />
      <CardInformation property={property} myProperty={myProperty} />
      {
        myProperty ? (
          <TouchableOpacity onPress={openModal} style={styles.ellipses}>
            <MaterialCommunityIcons name='dots-horizontal' color={theme['color-primary-500']} size={30} />
          </TouchableOpacity>
        ): null
      }
      <Modal
        visible={showModal}
        backdropStyle={styles.backdrop}
        onBackdropPress={closeModal}
        
      >
        <View style={[styles.modal, styles.boxShadow]}>
        <Button
            status={"info"}
            appearance="ghost"
            onPress={handleEditProperty}
          >
            Edit Property
          </Button>

          <Button
            status={"danger"}
            appearance="ghost"
            onPress={handleDeleteProperty}
          >
            Delete Property
          </Button>
          <Button appearance="ghost" onPress={closeModal}>
            Cancel
          </Button>
        </View>
      </Modal>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: LISTMARGIN,
    borderRadius: 5,
    backgroundColor: "white",
  },
  ellipses: {
    backgroundColor: "#fff",
    position: "absolute",
    borderRadius: 5,
    paddingHorizontal: 5,
    top: 10,
    right: 15,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 20,
  },
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
})