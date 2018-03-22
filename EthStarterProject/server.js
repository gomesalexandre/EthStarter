const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  // CUSTOM ROUTES GO HERE
  server.get('/campaign/new', (req, res) => {
    return app.render(req, res, '/campaign/new');
  });
  server.get('/campaign/:address', (req, res) => {
    const mergedQuery = Object.assign({}, req.query, req.params);
    return app.render(req, res, '/campaign/campaign', mergedQuery);
  });
  // THIS IS THE DEFAULT ROUTE, DON'T EDIT THIS
  server.get('*', (req, res) => {
    return handle(req, res);
  });
  const port = process.env.PORT || 3000;

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Express listening on port ${port}...`);
  });
});
