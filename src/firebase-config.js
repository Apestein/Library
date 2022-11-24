const config = {
  /* TODO: ADD YOUR FIREBASE CONFIGURATION OBJECT HERE */
  apiKey: "AIzaSyApa0C4fxHyhqFePbSMAPSqs39oywuPQow",
  authDomain: "library-16c6a.firebaseapp.com",
  projectId: "library-16c6a",
  storageBucket: "library-16c6a.appspot.com",
  messagingSenderId: "59755844753",
  appId: "1:59755844753:web:12c00d7fa0a305db835b30",
}

export function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error(
      "No Firebase configuration object provided." +
        "\n" +
        "Add your web app's configuration object to firebase-config.js"
    )
  } else {
    return config
  }
}
