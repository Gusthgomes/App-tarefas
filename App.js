import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Keyboard} from 'react-native';
import Login from './src/index';
import TaskList from './src/taskList';
import firebase from './src/firebaseConnection';
import Feather from 'react-native-vector-icons/Feather';

function App(){
  const [user, setUser] = useState(null);
  const inputRef = useRef(null);
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [key, setKey] = useState('');

  useEffect(() => {

    function getUser(){
      if(!user){
        return;

      }

      firebase.database().ref('Tarefas').child(user).once('value', (snapshot) => {
        setTasks([]);

        snapshot?.forEach((childItem) => {
          let data = {
            key: childItem.key,
            nome: childItem.val().nome,
          }

          setTasks(oldTasks => [...oldTasks, data])

        })
      })

    }

    getUser();

  }, [user]);

  function handleAdd(){
    if(newTask === '') {
      alert("Por favor preencha o campo!")
      return;
    }

    // Editando uma tarefa.

    if (key !== '') {
      firebase.database().ref('Tarefas').child(user).child(key).update({
        nome: newTask
      })

      .then(()=> {
        const taskIndex = tasks.findIndex( item => item.key === key)
        let taskClone = tasks;
        taskClone[taskIndex].nome = newTask

        setTasks([...taskClone])
      })

      Keyboard.dismiss();
      setNewTask('');
      setKey('');
      return;
    }


    let tarefas = firebase.database().ref('Tarefas').child(user)
    let chave = tarefas.push().key;

    tarefas.child(chave).set({
      nome: newTask
    })

    .then(() => {
      const data = {
        key: chave,
        nome: newTask
      };

      setTasks(oldTasks => [...oldTasks, data])

    })

    Keyboard.dismiss();
    setNewTask('');

  }

  function handleDelete(key){
    firebase.database().ref('Tarefas').child(user).child(key).remove()

    .then(() => {
      const findTasks = tasks.filter( item => item.key !== key);
      setTasks(findTasks);
    })
    
  }

  function handleEdit(data){
    setKey(data.key);
    setNewTask(data.nome);
    inputRef.current.focus();

  }

  function cancelEdit(){
    setKey('');
    setNewTask('');
    Keyboard.dismiss();
  }

  if(!user) {
    return <Login changeStatus={(user) => setUser(user)} />
  }
  
  return(
   <SafeAreaView style={styles.container}>

    { key.length > 0 && (
      <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 8}}>
      <TouchableOpacity onPress={cancelEdit}>
        <Feather name='x-circle' size={20} color="#ff0000"/>
      </TouchableOpacity>
  
      <Text style={{color:"#ff0000", marginLeft: 5}}>
        Você está editando uma tarefa!
      </Text>
  
      </View>
    )}


      <View style={styles.containerTask}>

          <TextInput
          style={styles.containerInput}
          placeholder="O que vamos fazer agora ?"
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
          ref={inputRef}
          />

          <TouchableOpacity style={styles.btnAdd} onPress={handleAdd}>

            <Text style={styles.textAdd}>+</Text>

          </TouchableOpacity>

      </View>

      <FlatList

      data={tasks}
      keyExtractor={item => item.key}
      renderItem={({item}) =>(
        <TaskList data={item} deleteItem={handleDelete} editItem={handleEdit}/>
      )}

      />

   </SafeAreaView> 
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  containerTask: {
    flexDirection: 'row',
  },
  containerInput: {
    flex: 1,
    borderColor: '#141414',
    height: 45,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 25,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
    marginHorizontal: 10
  },
  btnAdd: {
    backgroundColor: '#141414',
    height: 45,
    marginLeft: 5,
    paddingHorizontal: 14,
    marginTop: 25,
    marginRight: 10,
    borderRadius: 8,
    width: 41,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textAdd: {
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  }

});


export default App;
