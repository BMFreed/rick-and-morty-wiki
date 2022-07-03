const express = require('express');

const app = express();
const portNumber = 3000;
const sourceDir = 'build';

app.use(express.static(sourceDir));

app.listen(portNumber, () => {
  // eslint-disable-next-line no-console
  console.log(`Express web server started: http://localhost:${portNumber}`);
  // eslint-disable-next-line no-console
  console.log(`Serving content from /${sourceDir}/`);
});
