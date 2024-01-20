import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {addTodo} from '../../features/todos/todosSlice';

const AddTodo = () => {
  const [text, setText] = useState();
  const dispatch = useDispatch();

  function handleSumbit() {
    dispatch(addTodo(text));
    setText('');
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Todo"
        value={text}
        onChangeText={setText}
        style={styles.input}
      />
      <Button title="Ekle" onPress={handleSumbit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 12,
  },
  input: {
    backgroundColor: 'white',
    marginBottom: 8,
    padding: 8,
    height: 40,
  },
});

export default AddTodo;
