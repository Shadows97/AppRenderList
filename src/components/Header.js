import React from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';

import {useDispatch} from 'react-redux';
import {logOut} from '../store/action';

function Header({navigation, title}) {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logOut());
    navigation.navigate('Login');
  };
  return (
    <View style={style.container}>
      <View>
        <Text style={style.title}>Welcome {title}</Text>
      </View>
      <View />
      <TouchableOpacity onPress={logout}>
        <Text style={style.title}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'gray',
    height: Dimensions.get('screen').height * (8 / 100),
    paddingTop: '2%',
    flexDirection: 'row',
    paddingRight: '5%',
    paddingLeft: '5%',
  },
  title: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default Header;
