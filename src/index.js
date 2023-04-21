import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert} from 'react-native';
import firebase from '../src/firebaseConnection';

export default function Login( {changeStatus} ) {

    const [email, setEmail] = useState('');
    const [type, setType] = useState('login');
    const [password, setPassword] = useState('');

    function handleLogin(){
        if(type === 'login') {
            // login
            const user = firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) =>{
                changeStatus(user.user.uid)
            })
            .catch((error) => {
                console.log(error)
                alert('Ops! Erro ao efetuar o login')
                return;
            })
        }else {
            // cadastro
            const user = firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                changeStatus(user.user.uid)
            })
            .catch((error) => {
                console.log(error)
                alert('Ops! Erro ao cadastrar')
            })
        }
    }


    return(
        <SafeAreaView style={StyleSheet.container}>

            <Text
            style={styles.text}
            >E-mail:</Text>
            <TextInput
            placeholder='Digite o seu e-mail'
            style={styles.input}
            value={email}
            onChangeText={ (text) => setEmail(text)}
            />

            <Text
            style={styles.texto}
            >Senha:</Text>
            <TextInput
            placeholder='Digite a sua senha'
            style={styles.input}
            value={password}
            onChangeText={ (text) => setPassword(text)}
            />

            <TouchableOpacity
             style={[styles.btn, {backgroundColor: type === 'login' ? '#000000' : '#192999'}]}
             onPress={handleLogin}
             >
                <Text
                 style={styles.btnacessar}>
                    {type === 'login' ? 'Acessar' : 'Cadastrar'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
             onPress={ () => setType(type => type === 'login' ? 'Cadastar' : 'login')}
            style={styles.btnii}
            >
                <Text style={styles.textiii}>
                    { type === 'login' ? 'Criar uma conta' : 'Já possui uma conta!'}
                </Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 55,
        borderWidth: 1,
        padding: 10,
        margin: 15,
        borderRadius: 11,
        borderColor: '#121212',
        marginTop: 5,
        color: '#121212'
    },
    text: {
        marginTop: 30,
        marginHorizontal: 10,
        marginLeft: 22,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#121212'
    },
    texto: {
        marginTop: 2,
        marginHorizontal: 10,
        marginLeft: 22,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#121212',
    },
    btn: {
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        padding: 10,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 11,
        
    },
    btnacessar: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    btnii: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    textiii: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000000'
    }
});