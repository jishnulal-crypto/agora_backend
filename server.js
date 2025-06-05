const express = require('express');
const bodyParser = require('body-parser');
const sendFcmMessage = require('./sendFcmMessage'); // move function to this module

const app = express();
app.use(bodyParser.json());

app.post('/send-notification', async (req, res) => {
  const { token, title, body, data } = req.body;

  try {
    const result = await sendFcmMessage(token, title, body, data);
    res.json({ success: true, result });
  } catch (error) {
    console.error('FCM error:', error.response?.data || error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
