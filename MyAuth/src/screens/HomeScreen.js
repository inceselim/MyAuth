import React from 'react';
import {StyleSheet, View, StatusBar, Dimensions} from 'react-native';
import CustomButton from '../components/CustomButton';
import AddTodo from '../components/todos/AddTodo';
import ListTodo from '../components/todos/ListTodo';
import {useDispatch, useSelector} from 'react-redux';
import {login, logout} from '../features/auth/authSlice';
import Pdf from 'react-native-pdf';
import {BASE_URL} from '../extras/config';

const HomeScreen = ({navigation}) => {
  useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const source = {
    uri: `${BASE_URL}/pdf`,
    cache: true,
  };

  return (
    <View style={styles.container}>
      <ListTodo />
      <Pdf
        trustAllCerts={false}
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
      <CustomButton
        text="Çıkış"
        onPress={() => {
          dispatch(logout());
        }}
      />
      <CustomButton
        text="İmza Ekranı"
        onPress={() => {
          navigation.navigate('Signature');
        }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
