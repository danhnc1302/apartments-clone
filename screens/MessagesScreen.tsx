import React from "react";
import { 
  View,
  Text,
  StyleSheet } from "react-native";
  
export const MessagesScreen = ({
  route,
}: {
  route: { params: { conversationID: number; recipientName: string } };
}) => {
  

  return (
    <>
      <Text>MessagesScreen</Text>
    </>
  );
};

const styles = StyleSheet.create({
  
});