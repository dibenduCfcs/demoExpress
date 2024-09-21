import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { Routes } from './src/route';
import { setupSwagger } from './src/swagger';
import {
  getControllerList,
  registerRoutetoRoutes,
} from './src/commonUtility/commonFunction';
import Database from './src/database';

class App {
  app: Express;
  dbContext: Database;

  constructor() {
    this.app = express();
    this.dbContext = new Database();
  }

  addAPIRoutes(): void {
    registerRoutetoRoutes({
      parentInstance: this,
      childControllers: [{ childRouter: Routes, routerBasePath: '/api/v1' }],
    });
  }

  getControllerListFunc() {
    return getControllerList<any>(this);
  }

  getInstance(): Express {
    return this.app;
  }
}

const appInstance = new App();
const app = appInstance.getInstance();

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json({ limit: '1gb' }));
app.use(express.urlencoded({ limit: '1gb', extended: true }));
app.use(express.static('public'));
appInstance.dbContext.connect();
appInstance.addAPIRoutes();

setupSwagger(app, App);

app.listen(3000);
