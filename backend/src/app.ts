import * as express from 'express';
import * as bodyPaser from 'body-parser';
import * as https from 'https';
import { AppRoutes } from './routes';
import * as fs from 'fs';
import { authenticate } from './controller/authController';
import * as dotenv from 'dotenv';
import { getConnection } from './db';

dotenv.config();
// create express app
const app = express();
// Add middlewares
app.use(bodyPaser.json());
app.use(
  bodyPaser.urlencoded({
    extended: true
  })
);
// Add routes
AppRoutes.forEach(route => {
  if (route.auth) {
    app[route.method](
      route.path,
      authenticate,
      (
        request: express.Request,
        response: express.Response,
        next: Function
      ) => {
        route.action(request, response);
      }
    );
  } else {
    app[route.method](
      route.path,
      (
        request: express.Request,
        response: express.Response,
        next: Function
      ) => {
        route.action(request, response);
      }
    );
  }
});
export const startServer = async () => {
  await getConnection();
  const listener = app.listen(3000, () => {
    console.log(
      'App is running on http://localhost:%d in %s mode',
      listener.address().port,
      app.get('env')
    );
  });
  return listener;
};

export default app;
