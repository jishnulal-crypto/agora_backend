const {GoogleAuth} = require('google-auth-library');
const axios = require('axios');
const path = require('path');

// Path to your service account key JSON file
const SERVICE_ACCOUNT_PATH = path.join(__dirname, 'agoraflutter-eba9d-firebase-adminsdk-fbsvc-33d9587b12.json');
const PROJECT_ID = 'agoraflutter-eba9d';

async function sendFcmMessage(token, title, body, data = {}) {
  const auth = new GoogleAuth({
    keyFile: SERVICE_ACCOUNT_PATH,
    scopes: ['https://www.googleapis.com/auth/firebase.messaging'],
  });

  const client = await auth.getClient();
  const accessToken = await client.getAccessToken();

  const message = {
    message: {
      token,
      notification: {
        title,
        body,
      },
      data,
    },
  };

  const url = `https://fcm.googleapis.com/v1/projects/${PROJECT_ID}/messages:send`;

  const res = await axios.post(url, message, {
    headers: {
      Authorization: `Bearer ${accessToken.token}`,
      'Content-Type': 'application/json',
    },
  });

  return res.data;
}
