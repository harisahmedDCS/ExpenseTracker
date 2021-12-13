import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Swipeout from 'react-native-swipeout';
import {deleted} from '../redux/slices/Todo';

const History = () => {
  const dispatch = useDispatch();
  const todo = useSelector(state => state.todo.todos);
  const onDelete = id => {
    // const ans = todo.filter(item => {
    //   return item.id !== id;
    // });
    dispatch(deleted(id));
  };

  // console.log('todo', todo);
  return (
    <View>
      <View
        style={{
          borderBottomColor: 'gray',
          borderBottomWidth: 1,
          marginTop: 10,
        }}
      />
      {todo.map(item => {
        return (
          <Swipeout
            right={[
              {
                text: 'Delete',
                onPress: () => onDelete(item.id),
              },
            ]}
            key={item.id}
            style={[
              styles.task,
              styles.shadow,
              {
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,

                elevation: 2,
              },
            ]}>
            <View style={styles.flex}>
              <View style={styles.pd}>
                <Text>{item.text}</Text>
              </View>
              <View style={styles.pd2}>
                <Text
                  style={{
                    color: item.number < 0 ? 'red' : 'green',
                  }}>
                  {`$ ${item.number}`}
                </Text>
              </View>
              <View
                style={{
                  borderRightColor: item.number < 0 ? 'red' : 'green',
                  borderRightWidth: 10,
                  height: 50,
                }}></View>
            </View>
          </Swipeout>
        );
      })}
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  task: {
    height: 50,

    marginTop: 20,
    backgroundColor: '#fff',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  pd: {
    paddingTop: 15,
    paddingLeft: 15,
    flex: 3,
  },
  pd2: {
    paddingTop: 15,
    paddingLeft: 15,
    flex: 1,
  },
});
