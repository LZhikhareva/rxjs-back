const express = require('express');
const app = express();
const { faker } = require('@faker-js/faker');
const cors = require('cors');

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, PUT, PATCH, GET, POST');
  next();
});
app.get('/messages/unread', (req, res) => {
  const messages = [];
  for (let i = 0; i < 3; i++) {
    messages.push({
      from: faker.internet.email(),
      subject: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(),
      received: faker.date.past().getTime() / 1000
    });
  }
  res.json({
    status: 'ok',
    timestamp: Math.floor(Date.now() / 1000),
    messages
  });
});
const port = process.env.PORT || 3000;
app.listen(port);