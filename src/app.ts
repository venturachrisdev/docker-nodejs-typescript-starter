import 'reflect-metadata';
import morgan from 'morgan';
import express, { NextFunction, Response, Request } from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import lusca from 'lusca';
import dotenv from 'dotenv';
import path from 'path';
import passport from 'passport';
import expressValidator from 'express-validator';
import { getMorganLogLevel } from './application/utils/helpers';

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env' });
import { AppContext } from './application';

// Create Express server
const app = express();

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan(getMorganLogLevel()));
app.use(expressValidator());
app.use(passport.initialize());
app.use(passport.session());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use(
  express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }),
);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.redirect('/api');
});

new AppContext('/api', app).initialize();

export default app;
