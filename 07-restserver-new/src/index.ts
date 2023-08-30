import dotenv from 'dotenv';
dotenv.config();

import Server from './models/server';

const app = new Server();
app.listen();
