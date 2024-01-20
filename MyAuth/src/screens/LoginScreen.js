import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Logo from '../../assets/images/logo.png';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {login} from '../features/auth/authSlice';

const LogInScreen = ({navigation}) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const {height} = useWindowDimensions();

  const auth = useSelector(state => {
    //Alert.alert('state', state.auth.status.message);
    return state.auth;
  });

  const dispatch = useDispatch();

  return (
    <View>
      <Spinner visible={auth.status.loading} />
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />
        <CustomInput
          placeholder="Kullanıcı Adı"
          value={username}
          setValue={setUsername}
          keyboardType="email-address"
        />
        <CustomInput
          placeholder="Şifre"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />
        <CustomButton
          text="Giriş"
          onPress={() => {
            dispatch(login({username, password}));
          }}
        />
        <CustomButton
          text="Şifremi Unuttum"
          onPress={() => {
            navigation.navigate('ResetPassword');
          }}
        />
        <CustomButton
          text="Yeni Kayıt"
          onPress={() => {
            navigation.navigate('Register');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
    color: '#CF2626',
  },
  logo: {
    width: '80%',
    maxHeight: 500,
    maxWidth: 600,
  },
});
export default LogInScreen;
