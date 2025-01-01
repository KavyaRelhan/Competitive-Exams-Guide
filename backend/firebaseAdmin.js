const admin = require('firebase-admin');
const serviceAccount = require('./path-to-serviceAccountKey.json'); // Download from Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const sendNotification = async (token, message) => {
  try {
    await admin.messaging().send({
      token,
      notification: message,
    });
    console.log('Notification sent successfully!');
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

module.exports = { sendNotification };
