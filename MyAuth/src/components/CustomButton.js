import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';

const CustomButton = ({onPress, text}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.input}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 'auto',
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
    margin: 10,
    backgroundColor: '#3B71F3',
  },
  input: {
    fontWeight: 'bold',
    color: 'white',
  },
});
export default CustomButton;
