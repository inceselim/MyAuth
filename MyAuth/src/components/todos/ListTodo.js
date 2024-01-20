import React, {useEffect} from 'react';
import {FlatList, Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  toggleTodo,
  deleteTodo,
  getTodos,
} from '../../features/todos/todosSlice';

const ListTodo = () => {
  const todosState = useSelector(state => {
    return state.todos;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const OnDeleteTodo = id => {
    dispatch(deleteTodo(id));
  };

  const onToggleTodo = id => {
    dispatch(toggleTodo(id));
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        {item.isCompleted ? (
          <Text style={styles.lineThrough}>{item.title}</Text>
        ) : (
          <Text style={styles.itemText}>{item.title}</Text>
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity>
            <Icon
              name="delete"
              size={25}
              onPress={() => {
                console.log('deleting');
                OnDeleteTodo(item.id);
              }}
            />
          </TouchableOpacity>
          <Icon
            name="check"
            size={25}
            color="#333"
            onPress={() => onToggleTodo(item.id)}
          />
        </View>
      </View>
    );
  };

  return (
    <View>
      {todosState.status === null ? (
        <FlatList
          data={todosState.todoList}
          renderItem={({item}) => renderItem({item})}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text style={styles.itemText}>{todosState.status}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  lineThrough: {
    textDecorationLine: 'line-through',
    fontSize: 16,
    color: '#333',
  },
});

export default ListTodo;
