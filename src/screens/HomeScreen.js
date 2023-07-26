import { View, Text, Modal, StyleSheet,Dimensions, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import React, { useState, useRef, useEffect } from 'react';
import BottomSheet from 'react-native-simple-bottom-sheet';
import axios from 'axios';
import { useSelector } from 'react-redux';



function Item({ title }) {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  }

export default function HomeScreen({navigation}) {
    const [isLoading, setIsloading] = useState(false)
    const [data, setData] = useState([])
    const panelRef = useRef(null);
    const  user  = useSelector(state => state.user_session);

    useEffect(() => {
      if (user === null){
        navigation.navigate("Login")
      }
    }, [])

    const getFirstList = async () => {
        setIsloading(true)
        panelRef.current.togglePanel()
        const resp = await axios.get("https://jsonplaceholder.typicode.com/todos")
        setData(resp.data)
        setIsloading(false)
        
    }
    
    const getSecondList = async () => {
        setIsloading(true)
        panelRef.current.togglePanel()
        const resp = await axios.get("https://secondlist.free.beeceptor.com/todos")
        setData(resp.data)
        setIsloading(false)
        
    }

  
  return (
    <View style={styles.container}>
      { isLoading ? (<ActivityIndicator size="large" color="#0000ff" />): (<>
        <FlatList
            data={data}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={item => item.id}
        />
      </>)}
      <BottomSheet isOpen ref={ref => panelRef.current = ref}>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonStyle} onPress={getFirstList}>
                <Text style={styles.title}>First List</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonStyle} onPress={getSecondList}>
                <Text style={styles.title}>Second List</Text>
            </TouchableOpacity>
        </View>
      </BottomSheet>
      
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 50,
      },
      buttonStyle: {
        backgroundColor: 'gray',
        width: Dimensions.get('screen').width / 3,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      item: {
        backgroundColor: 'gray',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10
      },
      title: {
        fontSize: 20,
        color: 'white'
      },
})