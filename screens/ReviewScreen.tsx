import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ReviewScreen = ({
  route
}:{
  route: { params: {
    propertyID: number,
    propertyName: string[],
  } }
}) => {
  return (
    <View>
      <Text>ReviewScreen</Text>
    </View>
  )
}

export default ReviewScreen

const styles = StyleSheet.create({})