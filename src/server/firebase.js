import firebase from "firebase";
// const axios = require('axios')
// import {createClient} from "redis"

// (async () => {
//   const client = createClient({
//     host:'127.0.0.1',
// port:6379});

// client.on('error', (err) => console.log('Redis Client Error', err));

//  client.connect();


// console.log(client)


//   // await client.connect();

//   await client.set('key', 'value');
//   const value = await client.get('key');
//   console.log(value)
// })();

var firebaseConfig = {
  apiKey: "AIzaSyAti4PHNqwR3ae4tf8u5NeDINAVV5n-zS8", // API Key
  databaseURL:"https://vidconf3-default-rtdb.asia-southeast1.firebasedatabase.app/" // DatabaseURL
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



export const db = firebase;

var firepadRef = firebase.database().ref();

export const userName = prompt("What's your name?");
const urlparams = new URLSearchParams(window.location.search);
export var examFlag = urlparams.get("examFlag");
const roomId = urlparams.get("id");

// (function(){
  //get number of hits
  //number>10 Error
  //db => number+1
// })()


if (roomId) {
  firepadRef = firepadRef.child(roomId);
} else {
  firepadRef = firepadRef.push();
  // axios.get(`http://localhost/virtualclassroom-php/classRoom.php?classCode=oc_bea?roomId=${firepadRef.key}`)
  //   .then(resp => {
  //       console.log('axios data===========================>', resp.data);
  //   })
  //   .catch(err => {
  //       // Handle Error Here
  //       console.error(err);
  //   });
  window.history.replaceState(null, "Meet", !examFlag ? "?id=" : `?examFlag=${examFlag}&id=` + firepadRef.key);
}

export default firepadRef;
