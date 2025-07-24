import express from 'express';
// import helmet from 'helmet';

const app = express();

// const corsOptions = {
//   origin: 'https://example.com',
//   // optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

// app.use(cors(corsOptions));
// app.use(helmet());

// app.get('/', (req, res) => {
//   res.send('Hello World from Express Harold API no cors');
// });

app.get('/', (req, res) => {
  // CPU-intensive task: Count prime numbers up to a big limit
  const isPrime = (n: number) => {
    if (n < 2) return false;
    for (let i = 2; i * i <= n; i++) {
      if (n % i === 0) return false;
    }
    return true;
  };

  const limit = 500000; // Increase this number to stress more
  let count = 0;
  for (let i = 2; i <= limit; i++) {
    if (isPrime(i)) count++;
  }

  res.send(
    `There are ${count} prime numbers between 1 - ${limit}!!!***************************`
  );
});

// app.get('/', cors(corsOptions), (req, res) => {
//   res.send('Hello World from Express Harold API');
// });

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
