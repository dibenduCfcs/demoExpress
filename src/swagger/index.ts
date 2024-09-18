import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';
import { getSwaggerRoutesMetadata } from './swagger.config'; 
import { schemas } from '../modal';


const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'DEMO API',
    version: '1.0.0',
    description: 'Express API Test',
  },
  servers: [
    {
      url: 'http://localhost:3000', // Your server URL
    },
  ],
  components: {
    schemas: schemas,
    securitySchemes: {
      // bearerAuth: {
      //   type: 'http',
      //   scheme: 'bearer',
      //   bearerFormat: 'JWT',
      //   description: "Standard Authorization header using the Bearer scheme (\"bearer {token}\")",
      // },
      AuthorizationHeader: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: 'Bearer token for authentication',
      },
    },
  },
};

// Initialize swaggerSpec with paths
const swaggerSpec = {
  openapi: swaggerDefinition.openapi,
  info: swaggerDefinition.info,
  servers: swaggerDefinition.servers,
  paths: {}  // Initialize paths as an empty object
};

// Add default options for swagger-jsdoc
const options = {
  swaggerDefinition,
  apis: ['./src/**/*.ts'], // Path to your API spec
};

// Generate default swagger documentation from JSDoc comments
const defaultSwaggerSpec = swaggerJsdoc(options);

// Function to merge dynamic Swagger metadata with the default spec
function addDynamicSwaggerRoutes(controllers:any[]) {
  const dynamicRoutesMetadata = getSwaggerRoutesMetadata(controllers);
  swaggerSpec.paths = {
    ...swaggerSpec.paths,
    ...dynamicRoutesMetadata, // Merge dynamic metadata with existing paths
  };
}

export function setupSwagger(app: express.Application,App:new ()=>any) {
  const appInstance = new App();
  let controllers = appInstance.getControllerListFunc();
  addDynamicSwaggerRoutes(controllers); // Merge dynamic routes before setting up Swagger UI
  
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup({
    ...defaultSwaggerSpec,
    paths: swaggerSpec.paths // Use the merged paths with the dynamic ones
  }));

  // Serve the raw Swagger JSON
  app.get('/swagger/v1/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}
