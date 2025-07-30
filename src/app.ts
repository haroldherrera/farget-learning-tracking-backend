import express from 'express';
import { router } from './routes/tasks.routes';
import cors from 'cors';
import 'dotenv/config';
// import helmet from 'helmet';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const corsOrigins = process.env.CORS_ORIGINS || '';

const allowedOrigins = corsOrigins.split(',');

console.log(allowedOrigins);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // if using cookies or tokens in headers
  })
);

app.use('/tasks', router);

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.use((req, res) => {
  res.status(404).send('Endpoint not found');
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
