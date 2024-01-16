import express, { json, Express } from 'express';
import cors from 'cors';
import { join } from 'path';
import { NODE_ENV, PORT,GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from './config';
import router from './router';
import { DB } from './db';
// import {google} from 'googleapis'

/**
 * Serve "web" project build result (for production only)
 * @param {Express} app
 */
const serveWebProjectBuildResult = (app) => {
  if (NODE_ENV !== 'development') {
    const clientPath = '../../web/dist';
    app.use(express.static(join(__dirname, clientPath)));

    // Serve the HTML page
    app.get('*', (req, res) => {
      res.sendFile(join(__dirname, clientPath, 'index.html'));
    });
  }
};

/**
 * Global error handler
 * @param {Express} app
 */
const globalAPIErrorHandler = (app) => {
  // not found
  app.use((req, res, next) => {
    if (req.path.includes('/api/')) {
      res.status(404).send('Not found !');
    } else {
      next();
    }
  });

  // error
  app.use((err, req, res, next) => {
    if (req.path.includes('/api/')) {
      console.error('Error : ', err.stack);
      res.status(500).send('Error !');
    } else {
      next();
    }
  });
};

/**
 * Main function of API project
 */
const main = () => {
  DB.initialize();

  const app = express();
  app.use(cors());
  app.use(json());
  app.use('/api', router);

  globalAPIErrorHandler(app);
  serveWebProjectBuildResult(app);

  app.listen(PORT, (err) => {
    if (err) {
      console.log(`ERROR: ${err}`);
    } else {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    }
  });
};

//google social login
// const oauth2Client =new google.auth.Oauth2(
// GOOGLE_CLIENT_ID,
// GOOGLE_CLIENT_SECRET,
// 'http://localhost:8000/api/auth/google/callback'
// );

// const scopes = [
//   'https://www.googleapis.com/auth/userinfo.email',
//   'https://www.googleapis.com/auth/userinfo.profile'
// ]

// const authorizationUrl= oauth2Client.generateAuthUrl({
//   access_type: 'offline',
//   scope: scopes,
//   include_granted_scopes: true,
// })

main();
