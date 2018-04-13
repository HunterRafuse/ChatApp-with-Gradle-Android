import firebase from 'firebase';

class Backend {
  uid='';
  messagesRef = null;
  //initialize firebase server
  constructor() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAPmMKMgGuqtLDc2PE0b4VYPujqtAy3BJc ',
      authDomain: 'chat-app-93d65.firebase.com',
      databaseURL:'https://chat-app-93d65.firebaseio.com',
      storage_bucket: 'chat-app-93d65.appspot.com',
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setUid(user.uid);
      } else {
        firebase.auth().signInAnonymously().catch((error) => {
          alert(error.message);
        });
      }
    });
  }
  setUid(value) {
    this.uid = value;
  }
  getUid() {
    return this.uid;
  }
  //now we retrieve messages from the backend
  loadMessages(callback) {
    this.messagesRef = firebase.database().ref('messages');
    this.messagesRef.off();
    const onReceive = (data) => {
      const message = data.val();
      callback({
        _id:data.key,
        text: message.text,
        createdAt: new Date(message.createdAt),
        user: {
          _id: message.user._id,
          name: message.user.name,
        },
      });
    };
    this.messagesRef.limitToLast(20).on('child_added', onReceive);
  }
  //send your message to the Backend
  sendMessage(message) {
    for (let i =0; i < message.length; i++) {
      this.messagesRef.push({
        text: message[i].text,
        user: message[i].user,
        createdAt: firebase.database.ServerValue,TIMESTAMP,
      });
    }
  }
  // close the connection to the Backend
  closeChat() {
    if (this.messagesRef) {
      this.messagesRef.off();
    }
  }
}

export default new Backend();
