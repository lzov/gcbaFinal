// Configuración de Firebase (reemplazá por la tuya)
const firebaseConfig = {

  apiKey: "AIzaSyAs02lm8kPhSc5kb1CvIOAOcgmmYi36fWg",

  authDomain: "ecommerce-gcba.firebaseapp.com",

  projectId: "ecommerce-gcba",

  storageBucket: "ecommerce-gcba.firebasestorage.app",

  messagingSenderId: "927408098496",

  appId: "1:927408098496:web:16e960253f72b2715f7125"

};

firebase.initializeApp(firebaseConfig);

// Login anónimo automático
firebase.auth().signInAnonymously()
  .then(() => {
    return firebase.auth().currentUser.getIdToken();
  })
  .then(token => {
    // Usá este token en tus requests protegidos
    console.log('Token JWT anónimo:', token);
    // Ejemplo de uso:
    // fetch('/api/products', { headers: { Authorization: `Bearer ${token}` } })
  })
  .catch(error => {
    console.error(error);
  });