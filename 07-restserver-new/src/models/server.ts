import express from 'express';
import cors from 'cors';
import router from '../routes/user.routes';

class Server {
  app;
  port: number;
  usersPath: string;

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT || 3000);
    this.usersPath = '/api/users';

    // Middlewares
    this.middleares();

    // App routes
    this.routes();
  }

  middleares() {
    // CORS
    this.app.use(cors());

    // Read and Parse of body
    this.app.use(express.json());

    // Public directory
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.usersPath, router);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running on port', this.port);
    });
  }
}

export default Server;
