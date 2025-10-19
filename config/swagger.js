const path = require('path')
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-Commerce API',
      version: '1.0.0',
      description: 'API documentation for my Node.js e-commerce backend',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    servers: [
      {
        url: 'https://backend-yj3j.onrender.com/',
      },
    ],
  },
  apis: [path.join(__dirname, '../router/*.js')], // path to your route files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
