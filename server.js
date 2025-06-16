const express = require('express');
const bodyParser = require('body-parser');
const { sendFcmMessage } = require('./sendFcmMessage'); 

const app = express();
app.use(bodyParser.json());

app.post('/send-notification', async (req, res) => {
  const { token, title, data } = req.body;
  console.log(title)
  try {

    const result = await sendFcmMessage(token, title, data);
    res.json({ success: true, result });
  } catch (error) {
    console.error('FCM error:', error.response?.data || error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
