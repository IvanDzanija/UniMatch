const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/submit', (req, res) => {
  const { info } = req.body;
  
  if (!info) {
    return res.status(400).json({ message: 'Info is required' });
  }
  const response = [ { info } ];

  res.status(200).json(response);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});