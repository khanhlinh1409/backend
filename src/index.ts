import express from 'express';

const app = express();
const PORT = 10000;

// Middleware to parse JSON
app.use(express.json());

// Route example
app.get('/', (req, res) => {
  res.send('Hello from Express + TypeScript!');
});

app.post('/api/data', (req, res) => {
  const data = req.body;
  console.log('Received:', data);
  res.json({ message: 'Data received!', data });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
