import { execSync } from 'child_process';

const user = encodeURIComponent(process.env.DB_USERNAME);
const pass = encodeURIComponent(process.env.DB_PASSWORD);
process.env.DATABASE_URL = `postgresql://${user}:${pass}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

console.log('DATABASE_URL set for Prisma');
execSync('npx prisma migrate deploy', { stdio: 'inherit' });
