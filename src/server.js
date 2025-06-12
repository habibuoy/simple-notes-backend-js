const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const process = require('node:process');

async function init() {
  const server = Hapi.server({
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    port: 5000,
    routes: {
      cors: { origin: ['*'] }
    }
  });

  server.route(routes);

  await server.start();
  console.log(`Listening on ${server.info.uri}`);
}

init();