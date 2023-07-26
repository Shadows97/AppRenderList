import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {logUser} from '../store/action';

export default function LoginScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const userlist = useSelector(state => state.users);
  const user = useSelector(state => state.user_session);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user !== null) {
      navigation.navigate('Home');
    }
  },[]);

  const goToSignUp = () => {
    navigation.navigate('SignUp');
  };
  const login = () => {
    const old_user = userlist.filter(u => u.username == username);
    if (old_user.length == 0) {
      setMessage('Incorect username or password');
      setModalVisible(true);
    } else {
      const user = old_user[0];
      if (user.password !== password) {
        setMessage('Incorect username or password');
        setModalVisible(true);
      } else {
        dispatch(logUser(user));
        navigation.navigate('Home');
      }
    }
  };

  return (
    <View style={style.container}>
      <View style={style.inputContainer}>
        <Text style={style.inputLabel}>Username</Text>
        <TextInput
          style={style.inputStyle}
          onChangeText={text => setUsername(text)}
          value={username}
        />
      </View>
      <View style={style.inputContainer}>
        <Text style={style.inputLabel}>Password</Text>
        <TextInput
          style={style.inputStyle}
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
          value={password}
        />
      </View>
      <View style={style.inputContainer}>
        <TouchableOpacity onPress={login} style={style.buttonStyle}>
          <Text style={style.title}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={style.inputContainer}>
        <TouchableOpacity onPress={goToSignUp}>
          <Text>Sign up</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={style.container}>
          <View style={style.inputContainer}>
            <Text style={style.inputLabel}>{message}</Text>

            <TouchableOpacity
              style={[style.buttonStyle, {marginTop: 10}]}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={style.title}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: Dimensions.get('screen').height / 4,
  },
  inputStyle: {
    width: Dimensions.get('screen').width / 2,
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    margin: 5,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputLabel: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  buttonStyle: {
    backgroundColor: 'gray',
    width: Dimensions.get('screen').width / 3,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  title: {
    fontSize: 14,
    color: 'white',
  },
});
