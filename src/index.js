const express = require('express');
const { generateFakeData } = require('./routes/dataGenerator');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/generate-data', (req, res) => {
  const { region, errors, seed, page } = req.body;

  if (!region || !seed || typeof errors !== 'number' || typeof page !== 'number') {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const data = generateFakeData(region, errors, seed, page);
  res.json({ data });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
