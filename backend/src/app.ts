import * as express from 'express';
import * as bodyPaser from 'body-parser';
import * as https from 'https';
import { AppRoutes } from './routes';
import * as fs from 'fs';
import { authenticate } from './controller/authController';
import * as dotenv from 'dotenv';
import { getConnection } from './db';
import * as multer from 'multer';
import * as uuid from 'uuid/v1';
import { initCategories, getCategories } from './controller/categoryController';

dotenv.config();
const storage = multer.diskStorage({
  // Store uploaded file to temp file first
  destination: function (req, file, next) {
    const path = __dirname + '/../uploads/images'
    next(null, path);
  },
  filename: function(req, file, next) {
    const ext = file.originalname.split(".")[1];
    next(null, uuid()+'.'+ext);
  }
})
// create express app
const app = express();
// Add middlewares
// Serve static files only in development mode
if (app.get('env') === 'development') {
  app.use('/files', express.static(__dirname + '/../uploads/images'));
}
app.use(bodyPaser.json());
app.use(
  bodyPaser.urlencoded({
    extended: false
  })
);
// Add routes
const fileUpload = multer({ storage: storage }).single('file');
AppRoutes.forEach(route => {
  if (route.auth) {
    app[route.method](
      route.path,
      authenticate,
      fileUpload,
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
      fileUpload,
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
  await initCategories();
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
