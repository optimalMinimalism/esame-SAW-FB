/* eslint-env serviceworker */
/* global importScripts, firebase */

importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDDcOPvuZEVZ0ocoaA4Y3fg34ZImfr1yHM",
  authDomain: "esame-saw-bertolucci.firebaseapp.com",
  projectId: "esame-saw-bertolucci",
  messagingSenderId: "859296262136",
  appId: "1:859296262136:web:92067fdea3d06fdee5180d",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
  });
});
