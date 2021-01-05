import firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyFu7UppCRsdU2qWpFVgRG2KLAuamOPVk",
  authDomain: "nnotetodo.firebaseapp.com",
  projectId: "nnotetodo",
  storageBucket: "nnotetodo.appspot.com",
  messagingSenderId: "288013817128",
  appId: "1:288013817128:web:f6ce2a3d03e00e3744ac1d",
};

class Fire {
  constructor(callback) {
    this.init(callback);
  }

  init(callback) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        callback(null, user);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch((error) => {
            callback(error);
          });
      }
    });
  }
  getLists(callback) {
    let ref = firebase
      .firestore()
      .collection("users")
      .doc(this.userId)
      .collection("lists");

    this.unsubscribe = ref.onSnapshot((snapshot) => {
      lists = [];

      snapshot.forEach((doc) => {
        lists.push({ id: doc.id, ...doc.data() });
      });

      callback(lists);
    });
  }

  get userId() {
    return firebase.auth().currentUser.uid;
  }

  detach(){
    this.unsubscribe();
  }
}
export default Fire;
