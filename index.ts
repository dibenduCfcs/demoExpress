import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { Routes } from './src/route';
import { setupSwagger } from './src/swagger';
import { dbIntance } from './src/database';
import { expressApp } from 'express-swagger-decorators';
import { errorhandler } from './src/middleware';
import { tableSchemas } from './src/database/context';

const appInstance = expressApp();
const app = appInstance.getInstance();

dbIntance.connect();
appInstance.setDbContext(dbIntance.getContext());
appInstance.dbContext.addModels(tableSchemas);
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json({ limit: '1gb' }));
app.use(express.urlencoded({ limit: '1gb', extended: true }));
app.use(express.static('public'));
appInstance.addAPIRoutes([{ route: Routes, path: '/api/v1' }]);
setupSwagger(appInstance);
app.use(errorhandler);
app.listen(3000);
