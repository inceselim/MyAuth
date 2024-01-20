import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Navigation from './src/components/Navigation';
import {Provider} from 'react-redux';
import {store} from './src/store';
const Stack = createNativeStackNavigator();

const App = () => {
  console.log('App is started...');
  return (
    <SafeAreaView style={styles.safearea}>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
});

export default App;
