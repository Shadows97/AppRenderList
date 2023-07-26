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
import {addUser} from '../store/action';

export default function SignUpScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmePassword, setConfirmPassword] = useState('');
  const [ready, setReady] = useState(1);
  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const userlist = useSelector(state => state.users);
  const dispatch = useDispatch();

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  useEffect(() => {
    if (password !== confirmePassword && password !== '') {
      setReady(1);
    } else {
      setReady(0.5);
    }
  }, [confirmePassword, password]);

  const signUp = () => {
    if (ready != 1) {
      if (username == '' || password == '') {
        setMessage('All field is required');
        setModalVisible(true);
      } else {
        const old_user = userlist.filter(u => u.username == username);
        if (old_user.length > 0) {
          setMessage('The Username is already existe');
          setModalVisible(true);
        } else {
          dispatch(addUser({username, password}));
        }
      }
    } else {
      setMessage('The passwords are not the same');
      setModalVisible(true);
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
        <Text style={style.inputLabel}>Confirm Password</Text>
        <TextInput
          style={style.inputStyle}
          secureTextEntry={true}
          onChangeText={text => setConfirmPassword(text)}
          value={confirmePassword}
        />
      </View>
      <View style={style.inputContainer}>
        <TouchableOpacity
          style={style.buttonStyle}
          activeOpacity={ready}
          onPress={signUp}>
          <Text style={style.title}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <View style={style.inputContainer}>
        <TouchableOpacity onPress={goToLogin}>
          <Text>Login</Text>
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
