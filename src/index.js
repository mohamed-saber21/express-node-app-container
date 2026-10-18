const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => res.send('<h1>hiii welcome roro an i love you r</h1>'));