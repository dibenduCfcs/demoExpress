import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { schemas } from '../modal';
import {
  AppController,
  getSwaggerRoutesMetadata,
} from 'express-swagger-decorators';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'DEMO API',
    version: '1.0.0',
    description: 'Express API Test',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
  components: {
    schemas: schemas,
    securitySchemes: {
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
  ...swaggerDefinition,
  paths: {}, // Initialize paths as an empty object
};

// Add default options for swagger-jsdoc
const options = {
  swaggerDefinition,
  swaggerOptions: {
    url: '/swagger/v1/swagger.json',
  },
  apis: ['./src/**/*.ts'], // Path to your API spec
};

// Generate default swagger documentation from JSDoc comments
const defaultSwaggerSpec = swaggerJsdoc(options);

// Function to merge dynamic Swagger metadata with the default spec
function addDynamicSwaggerRoutes(controllers: any[]) {
  const dynamicRoutesMetadata = getSwaggerRoutesMetadata(controllers);
  swaggerSpec.paths = {
    ...swaggerSpec.paths,
    ...dynamicRoutesMetadata, // Merge dynamic metadata with existing paths
  };
}

export function setupSwagger(appInstance: AppController) {
  const app = appInstance.getInstance();
  let controllers = appInstance.getControllerListFunc();
  addDynamicSwaggerRoutes(controllers);

  app.use(
    '/swagger',
    swaggerUi.serveFiles(
      {
        ...defaultSwaggerSpec,
        paths: swaggerSpec.paths,
      },
      {},
    ),
  );

  app.get('/swagger/api-docs', (req, res) => {
    res.send(
      swaggerUi.generateHTML({
        ...defaultSwaggerSpec,
        paths: swaggerSpec.paths,
      }),
    );
  });

  app.get('/swagger/v1/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  app.get('/swagger', (req, res) => {
    res.redirect('/swagger/api-docs');
  });
}
