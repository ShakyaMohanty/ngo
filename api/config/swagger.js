const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'NGO API Docs',
        version: '0.02',
        description: 'API documentation for NGO project',
    },
    servers: [
        {
            url: 'http://localhost:3001/api',
        },
    ],
};
console.log('Swagger loading from:', path.resolve(__dirname, '../dbroute/*.js'));
const options = {
    swaggerDefinition,
    apis: [path.resolve(__dirname, '../dbroute/*.js')], // Swagger will scan these files for JSDoc comments

    /* apis: ['./api/dbroute/*.js'] -------  this will work because it is relative to process.cwd(), 
    not relative to swagger.js's location (__dirname). It means relative to where you run node from 
    — typically your project root (ngo/ )  */
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;