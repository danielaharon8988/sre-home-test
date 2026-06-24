const express = require('express');
const cors = require('cors');
const log4js = require('log4js');
const db = require('./db');
const { v4: uuidv4 } = require('uuid');

log4js.configure({
  appenders: { out: { type: 'stdout' } },
  categories: {
    default: {
      appenders: ['out'],
      level: 'info'
    }
  }
});

const logger = log4js.getLogger();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/users', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'db error' });
  }
});
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const [users] = await db.query(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password]
    );

    if (users.length === 0) {
      return res.status(401).json({
        error: 'invalid credentials'
      });
    }

    const token = uuidv4();

    await db.query(
      'INSERT INTO tokens(user_id, token) VALUES (?, ?)',
      [users[0].id, token]
    );
   logger.info(JSON.stringify({
     timestamp: new Date().toISOString(),
     userId: users[0].id,
     action: 'login',
     ip: req.ip
   }));
    res.json({
      message: 'login successful',
      token: token
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'server error'
    });
  }
});
app.listen(3000, () => {
  console.log('Backend is running on port 3000');
});
