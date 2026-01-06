import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/Homescreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient()

export default function App() {
  
  return (
    <QueryClientProvider client={client}>
      <SafeAreaProvider>
        <HomeScreen />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
