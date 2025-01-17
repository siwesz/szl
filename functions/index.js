/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const cors = require("cors");

const corsHandler = cors({ 
  origin: [
    'http://localhost:3000', 
    'http://localhost:5173', 
    'https://your-production-domain.com' // Replace with your actual production domain
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
});

// Example helloWorld function
exports.helloWorld = (request, response) => {
  corsHandler(request, response, () => {
    response.send("Hello from the server!");
  });
};
