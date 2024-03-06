import React from 'react';
import Navigation from './navigation';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { QueryClient, QueryClientProvider } from "react-query";
import { theme } from "./theme";

export default function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <ApplicationProvider {...eva} theme={theme}>
        <Navigation />
      </ApplicationProvider>
    </QueryClientProvider>
  );
}


