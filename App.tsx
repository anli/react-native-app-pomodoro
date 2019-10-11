import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { CountdownScreen } from './src/screens/CountdownScreen';

const App = () => (
  <PaperProvider>
    <CountdownScreen />
  </PaperProvider>
);

export default App;
