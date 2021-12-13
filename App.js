import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import History from './src/components/History';
import {add} from './src/redux/slices/Todo';
import {useDispatch, useSelector} from 'react-redux';
import {SwipeActionView} from 'react-native-action-view';
const App = () => {
  const [balance, setBalance] = useState(0);
  const [greater, setGreater] = useState(0);
  const [less, setLess] = useState(0);
  const todo = useSelector(state => state.todo.todos);

  console.log('log', todo);
  useEffect(() => {
    const AccountBalance = () => {
      todo.forEach(item => {
        if (parseInt(item.number) > 0) {
          setLess(0);
          console.log('lss', less);
        }
      });
      console.log('::::', todo);
      var ans = 0;
      var greater = 0;
      var less = 0;
      // for (var i = 0; i < todo.length; i++) {
      //   ans = parseInt(todo[i].number) + ans;
      //   setBalance(ans);
      //   console.log('addition', ans);
      // }
      {
        todo == ''
          ? setBalance(0)
          : todo.forEach((item, key) => {
              ans = parseInt(item.number) + ans;
              setBalance(ans);
              console.log('addition', `${key}times${item.number}`);
            });
      }
      if (todo == '') {
        setGreater(0);
        setLess(0);
      } else {
        todo.forEach(item => {
          if (parseInt(item.number) > 0) {
            greater = parseInt(item.number) + greater;
            setGreater(greater);
            console.log('addition', ans);
          } else if (parseInt(item.number) < 0) {
            less = parseInt(item.number) + less;
            setLess(less);
            console.log('lss', less);
          }
        });
      }
    };
    AccountBalance();
  }, [todo]);
  const [formData, setFormData] = useState({
    text: '',
    number: '',
    id: Math.random(),
  });
  const onChangeText = (key, val) => {
    setFormData({...formData, [key]: val, id: Math.random()});
  };
  const dispatch = useDispatch();
  const onPress = () => {
    // const item = {
    //   name: text,
    // };
    // todo.unshift(item);
    // onChangeText('');
    // setTodo(todo);
    // console.log('arr', todo);
    setFormData({
      text: '',
      number: '',
    });
    if (text !== '' && number !== '') {
      dispatch(add(formData));
    }
  };
  // const obj = JSON.parse(formData);
  const {text, number} = formData;
  console.log('___', formData);
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.innerContainer}>
        <View>
          <Text style={styles.txt}>Balance: ${balance}</Text>
        </View>
        {/* income || expenses */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <LinearGradient
            style={{borderRadius: 10}}
            colors={['#11998e', '#38ef7d']}>
            <View style={styles.box}>
              <Text style={styles.txtBox}>INCOME</Text>
              <Text style={styles.txtBox}>$ {greater}</Text>
            </View>
          </LinearGradient>
          <LinearGradient
            style={{borderRadius: 10}}
            colors={['#D31027', '#EA384D']}>
            <View style={styles.box}>
              <Text style={styles.txtBox}>EXPENSE</Text>
              <Text style={styles.txtBox}>$ {less}</Text>
            </View>
          </LinearGradient>
        </View>
        {/* Textinput */}
        <TextInput
          style={styles.input}
          onChangeText={val => onChangeText('text', val)}
          value={text}
          placeholder="Enter Text"
        />
        <Text style={[styles.txtTransaction, {marginTop: 20}]}>AMOUNT</Text>
        <Text style={styles.txtTransaction2}>
          (negative for expense,positive for income)
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={val => onChangeText('number', val)}
          value={number}
          keyboardType="number-pad"
          placeholder="Enter Amount"
        />
        <LinearGradient colors={['#606c88', '#3f4c6b']} style={{marginTop: 20}}>
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={1}
            onPress={onPress}>
            <Text style={styles.addBtn}>Add Transaction</Text>
          </TouchableOpacity>
        </LinearGradient>
        <Text style={[styles.txtTransaction, {marginTop: 20, fontSize: 25}]}>
          History
        </Text>
        <History />
      </View>
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    padding: 20,
  },
  input: {
    height: 50,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    borderColor: 'gray',
  },
  btn: {
    padding: 15,
    alignItems: 'center',
  },
  txt: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  box: {
    padding: 45,
    borderRadius: 50,
  },
  txtBox: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  txtTransaction: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  txtTransaction2: {
    fontSize: 14,
    color: 'gray',
  },
  addBtn: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
