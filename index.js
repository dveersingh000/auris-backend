const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', require('./src/routes/meta.routes'));
app.use('/api', require('./src/routes/perfume.routes'));
app.use('/api', require('./src/routes/recommendation.routes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
