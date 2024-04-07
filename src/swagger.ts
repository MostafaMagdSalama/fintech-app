import SwaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { version } from '../package.json';
import { Express, Response, Request } from 'express';

const options: SwaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'fintech API',
      version: version,
      description: 'A simple fintech API',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/index.ts', './src/routes/account.router.ts'],
};

const swaggerSpec = SwaggerJsdoc(options);

function swaggerDoc(app: Express, port: string) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get('docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}
export default swaggerDoc;
