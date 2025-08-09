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

// // Use this code snippet in your app.
// // If you need more information about configurations or implementing the sample code, visit the AWS docs:
// // https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started.html

// import {
//   SecretsManagerClient,
//   GetSecretValueCommand,
// } from '@aws-sdk/client-secrets-manager';

// const secret_name = 'jira-db-master-secret-development';

// const client = new SecretsManagerClient({
//   region: 'us-east-1',
// });

// let response;

// try {
//   response = await client.send(
//     new GetSecretValueCommand({
//       SecretId: secret_name,
//       VersionStage: 'AWSCURRENT', // VersionStage defaults to AWSCURRENT if unspecified
//     })
//   );
// } catch (error) {
//   // For a list of exceptions thrown, see
//   // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
//   throw error;
// }

// const secret = response.SecretString;

// // Your code goes here
