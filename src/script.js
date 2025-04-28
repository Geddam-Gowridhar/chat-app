import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { collection, addDoc, onSnapshot, serverTimestamp, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const authSection = document.getElementById('auth-section');
const chatSection = document.getElementById('chat-section');
const welcome = document.getElementById('welcome');
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');

onAuthStateChanged(auth, user => {
  if (user) {
    authSection.classList.add('hidden');
    chatSection.classList.remove('hidden');
    welcome.innerText = `Welcome, ${user.displayName || user.email}`;
    loadMessages();
  } else {
    authSection.classList.remove('hidden');
    chatSection.classList.add('hidden');
  }
});

window.signUp = async () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  await createUserWithEmailAndPassword(auth, email, password);
};

window.signIn = async () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  await signInWithEmailAndPassword(auth, email, password);
};

window.signOut = async () => {
  await signOut(auth);
};

window.googleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error(error.message);
  }
};

window.sendMessage = async () => {
  const text = messageInput.value.trim();
  if (text && auth.currentUser) {
    await addDoc(collection(db, "messages"), {
      text,
      sender: auth.currentUser.displayName || auth.currentUser.email,
      senderId: auth.currentUser.uid,
      photoURL: auth.currentUser.photoURL || 'https://i.pravatar.cc/40',
      timestamp: serverTimestamp()
    });
    messageInput.value = '';
  }
};

function loadMessages() {
  onSnapshot(collection(db, "messages"), snapshot => {
    messagesDiv.innerHTML = '';
    snapshot.forEach(docSnap => {
      const msg = docSnap.data();
      const container = document.createElement('div');
      container.className = "flex items-center space-x-2 mb-2";

      const avatar = document.createElement('img');
      avatar.src = msg.photoURL;
      avatar.alt = "Avatar";
      avatar.className = "w-8 h-8 rounded-full";

      const messageBox = document.createElement('div');
      messageBox.className = "bg-white p-2 rounded shadow flex-1";
      messageBox.innerHTML = `<b>${msg.sender}</b><br>${msg.text}`;

      container.appendChild(avatar);
      container.appendChild(messageBox);
      messagesDiv.appendChild(container);
    });
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  });
}