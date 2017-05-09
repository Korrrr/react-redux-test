const express = require('express');
const path = require('path');


const app = express();

const PORT = 3000;

app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve('./server/static/', 'index.html'));
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
