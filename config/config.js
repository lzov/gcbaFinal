// config/config.js
export const firebaseConfig = (() => {
  const requiredVars = [
    'FIREBASE_TYPE',
    'FIREBASE_PROJECT_ID',
    'FIREBASE_PRIVATE_KEY_ID',
    'FIREBASE_PRIVATE_KEY',
    'FIREBASE_CLIENT_EMAIL',
    'FIREBASE_CLIENT_ID',
    'FIREBASE_AUTH_URI',
    'FIREBASE_TOKEN_URI',
    'FIREBASE_AUTH_PROVIDER_X509_CERT_URL',  // <-- corregido
    'FIREBASE_CLIENT_X509_CERT_URL',         // <-- corregido
  ];

  const missingVars = requiredVars.filter(v => !process.env[v]);
  if (missingVars.length) {
    throw new Error(`Faltan variables de entorno: ${missingVars.join(', ')}`);
  }

  return {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,  // corregido
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,               // corregido
  };
})();
