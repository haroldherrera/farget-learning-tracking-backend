import express from 'express';
import { routerTasks } from './routes/tasks.routes';
import cors from 'cors';
import 'dotenv/config';
import { routerUsers } from './routes/users.routes';
// import helmet from 'helmet';

const PORT = 3000;

const app = express();

const corsOrigins = process.env.CORS_ORIGINS || '';
const allowedOrigins = corsOrigins.split(',');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
  })
);

app.use('/tasks', routerTasks);
app.use('/users', routerUsers);

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.use((req, res) => {
  res.status(404).send('Endpoint not found');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
