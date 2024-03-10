import React from 'react';
import { 
  StyleSheet, 
  ViewStyle,
  View, 
} from 'react-native';
import { Button, Text } from '@ui-kitten/components';

import { theme } from '../theme';

import { Screen } from '../components/Screen';

const ForgotPasswordScreen = ({
  route
}, {
  route: { params: { token: string }}
}) => {
  return (
    <Screen>
      <Text>
      ForgotPasswordScreen
      </Text>
    </Screen>
  )
}

export default ForgotPasswordScreen;

const styles = StyleSheet.create({})