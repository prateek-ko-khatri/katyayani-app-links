const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

// Serve .well-known directory
app.use('/.well-known', express.static(path.join(__dirname, '.well-known'), {
  setHeaders: (res, path, stat) => {
    if (path.endsWith('.json')) {
      res.set('Content-Type', 'application/json');
    }
  }
}));

app.get('/', (req, res) => {
  res.send('Server is running. assetlinks.json is hosted at /.well-known/assetlinks.json');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
