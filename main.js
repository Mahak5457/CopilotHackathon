// setting backend with website

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCqbIRE1o6b2n2EFXqc6KmHMcJOhmZ3LUo",
  authDomain: "financetracker-be9f8.firebaseapp.com",
  databaseURL: "https://financetracker-be9f8-default-rtdb.firebaseio.com",
  projectId: "financetracker-be9f8",
  storageBucket: "financetracker-be9f8.appspot.com",
  messagingSenderId: "411869046612",
  appId: "1:411869046612:web:51d470c512bd52000d8ac1",
  measurementId: "G-0KYN3HME21",
});
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const database = firebaseApp.database();
var UserID = "";



const edit = () =>{
  const userId = firebase.auth().currentUser.uid;
  const balance = document.getElementById("edit").value;
  console.log(userId);
  console.log(balance);
  firebaseApp.database().ref('users/' + userId).set({
    balance: balance
  });
  document.getElementById("edit").value = "";
  show.call();
}

const show = () => {
  var data = "0";
  if(firebase.auth().currentUser!=null)
  data = getbalance.call();
  document.getElementById("balance").innerHTML = data;
}

const getbalance = () => {
  UserID = firebase.auth().currentUser.uid;
  var data = 0;
  var starCountRef = firebase.database().ref('users/' + UserID + '/balance');
  starCountRef.on('value', (snapshot) => {
    data = snapshot.val();
  });
  return data;
}

const add = () => {
  const userId = firebase.auth().currentUser.uid;
  const addno = document.getElementById("add").value;
  var data = "0";
  var starCountRef = firebase.database().ref('users/' + userId + '/balance');
starCountRef.on('value', (snapshot) => {
  data = snapshot.val();
});
  var data1 = parseInt(data)+Number(addno);
  firebaseApp.database().ref('users/' + userId).set({
    balance: data1
  });
  show();
  document.getElementById("add").value = "";
}

const Delete = () => {
  const userId = firebase.auth().currentUser.uid;
  const addno = document.getElementById("delete").value;
  var data = 0;
  console.log(addno);
  var starCountRef = firebase.database().ref('users/' + userId + '/balance');
starCountRef.on('value', (snapshot) => {
  data = snapshot.val();
});
  console.log(data);
  data = Number(data)-Number(addno);
  firebaseApp.database().ref('users/' + userId).set({
    balance: data
  });
  show();
  document.getElementById("delete").value = "";
}

// Sign Up function
const SignUp = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log(email, password);
  // firebase code
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((result) => {
    // Signed in 
    // document.write("You are signed up")
    window.location.assign("financepage.html")
    UserID = result.user.multiFactor.user.uid;
    console.log(result.user.multiFactor.user.uid)
    // ...
  })
  .catch((error) => {
    console.log(error.code);
    console.log(error.message)
    // ..
  });
}

// SignIn function
const SignIn = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  //firebase code
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((result) => {
    // Signed in
    // document.write("You are signed in")
    window.location.assign("financepage.html")
    UserID = result.user.multiFactor.user.uid;
    console.log(result.user.multiFactor.user.uid)
    // ...
  })
  .catch((error) => {
    console.log(error.code);
    console.log(error.message)
  });
}