import React, {useState, useRef, useContext} from 'react';
import {StyleSheet, View, Image, StatusBar} from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';
import {AuthContext} from '../context/AuthContext';

const MySignatureScreen = ({navigation}) => {
  const {saveSignature} = useContext(AuthContext);
  const ref = useRef();

  const handleData = data => {
    saveSignature(data);
    console.log('data', data.length);
  };

  return (
    <SignatureScreen
      ref={ref}
      onOK={handleData}
      autoClear={false}
      descriptionText=""
    />
  );
};

export default MySignatureScreen;
