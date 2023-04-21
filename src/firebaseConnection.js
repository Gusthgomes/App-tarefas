import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {

  apiKey: "AIzaSyDZqYLYOqvmzjFYHRM8LOqhumPHxOMMZqk",

  authDomain: "tarefas-721d7.firebaseapp.com",

  projectId: "tarefas-721d7",

  storageBucket: "tarefas-721d7.appspot.com",

  messagingSenderId: "274393391580",

  appId: "1:274393391580:web:33a562a4dfb79db54baf19"


};

if(!firebase.apps.length){
  //Abrir minha conexao
  firebase.initializeApp(firebaseConfig);
}

export default firebase;