import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import Logo from '../../assets/images/logo.png';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import Spinner from 'react-native-loading-spinner-overlay';
import {useDispatch, useSelector} from 'react-redux';
import {register} from '../features/auth/authSlice';

const RegisterScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {height} = useWindowDimensions();

  const auth = useSelector(state => {
    state.auth;
    //console.log(state.auth);
  });
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Spinner visible={auth?.status?.isLoading} />
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
        />
        <CustomInput
          placeholder="EMail Adresiniz"
          value={email}
          setValue={setEmail}
        />
        <CustomInput
          placeholder="Şifre"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />
        <CustomButton
          text="Kaydet"
          onPress={() => {
            dispatch(register({username, email, password}));
          }}
        />
        <CustomButton
          text="Şifremi Unuttum"
          onPress={() => {
            navigation.navigate('ResetPassword');
          }}
        />
        <CustomButton
          text="Giriş"
          onPress={() => {
            navigation.navigate('Login');
          }}
        />
      </View>
    </ScrollView>
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

export default RegisterScreen;
