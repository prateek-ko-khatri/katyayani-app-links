const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const { nanoid } = require('nanoid');
const Url = require('./models/url');
const extractFallbackUrl = require('./utils/extract');


const app = express();
const PORT = 3000;
app.use(express.json());

app.use(cors());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

app.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;
  if (!originalUrl) return res.status(400).json({ error: 'URL is required' });

 
  const fallbackUrl = extractFallbackUrl(originalUrl);
  if (!fallbackUrl) return res.status(400).json({ error: 'fall_back_url not found' });

  const shortId = nanoid(6);
  const shortUrl = `${process.env.BASE_URL}/${shortId}`;

  await Url.create({ originalUrl, fallbackUrl, shortId });

  res.json({ shortUrl });
});


// app.get('/:shortId', async (req, res) => {
//   const { shortId } = req.params;
//   const url = await Url.findOne({ shortId });
//   if (url) return res.redirect(url.originalUrl);
//   res.status(404).send('URL not found');
// });


app.get('/:shortId', async (req, res) => {
  const { shortId } = req.params;
  const urlDoc = await Url.findOne({ shortId });

  if (urlDoc) {
    res.redirect(urlDoc.fallbackUrl);
  } else {
    res.status(404).send('URL not found');
  }
});



app.use('/.well-known', express.static(path.join(__dirname, '.well-known'), {
  setHeaders: (res, path, stat) => {
    if (path.endsWith('.json')) {
      res.set('Content-Type', 'application/json');
    }
  }
}));

app.get('/', (req, res) => {
  res.send('Server is running. assetlinks.json is hosted at .well-known/assetlinks.json');
});


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
