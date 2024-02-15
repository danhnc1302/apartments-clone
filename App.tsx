import React from 'react';
import Navigation from './navigation';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { theme } from "./theme";

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={theme}>
      <Navigation />
    </ApplicationProvider>
  );
}


