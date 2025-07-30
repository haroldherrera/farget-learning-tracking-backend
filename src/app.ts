import express from 'express';
import { router } from './routes/tasks.routes';
// import helmet from 'helmet';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/tasks', router);

app.use((req, res) => {
  res.status(404).send('Endpoint not found');

});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
