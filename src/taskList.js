import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export default function TaskList({data, deleteItem, editItem}){
    return(
        
        <View style={styles.container}>
            <TouchableOpacity style={styles.btn} onPress={() => deleteItem(data.key)}>
                <Feather name="trash" color="#fff" size={20}/>
            </TouchableOpacity>

            <TouchableWithoutFeedback onPress={ () => editItem(data)}>
                <Text style={styles.text}>
                    {data.nome} 
                </Text>
            </TouchableWithoutFeedback>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#00b0e2',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    text: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 50,
        marginRight: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 35
    }
});