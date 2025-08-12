const express = require('express');
const pino = require('pino');
const app = express();


const logger = pino({}, pino.multistream([
  { stream: process.stdout }
]));

app.get('/', async (_req, res) => {
  logger.info('Hello from /');
  res.json({ ok: true, ts: new Date().toISOString() });
});

app.get('/work', async (_req, res) => {
  await new Promise(r => setTimeout(r, 120)); // Simulate some work
  logger.info({ task: 'computeSomething', units: 42 }, 'work done');
  res.json({ job: 'done' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.info({ port: PORT }, 'Server started'));
