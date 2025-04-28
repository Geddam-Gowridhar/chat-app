
const auth = firebase.auth();
const db = firebase.firestore();

auth.onAuthStateChanged(user => {
  if (user) {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('chat-section').style.display = 'block';
    loadMessages();
  } else {
    document.getElementById('auth-section').style.display = 'block';
    document.getElementById('chat-section').style.display = 'none';
  }
});

function signUp() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  auth.createUserWithEmailAndPassword(email, password)
    .catch(e => alert(e.message));
}

function signIn() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  auth.signInWithEmailAndPassword(email, password)
    .catch(e => alert(e.message));
}

function signOut() {
  auth.signOut();
}

function sendMessage() {
  const messageInput = document.getElementById('messageInput');
  const text = messageInput.value;
  const user = auth.currentUser;
  if (text.trim() !== '' && user) {
    db.collection('messages').add({
      text: text,
      senderId: user.uid,
      senderEmail: user.email,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    messageInput.value = '';
  }
}

function loadMessages() {
  db.collection('messages').orderBy('timestamp').onSnapshot(snapshot => {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = '';
    snapshot.forEach(doc => {
      const message = doc.data();
      const messageElement = document.createElement('div');
      messageElement.textContent = message.senderEmail + ": " + message.text;

      if (auth.currentUser && message.senderId === auth.currentUser.uid) {
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.onclick = () => deleteMessage(doc.id);
        messageElement.appendChild(delBtn);
      }

      messagesDiv.appendChild(messageElement);
    });
  });
}

function deleteMessage(id) {
  db.collection('messages').doc(id).delete();
}
