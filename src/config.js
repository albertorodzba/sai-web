require('dotenv').config();

const config ={};
config.MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/test";
config.PORT = process.env.PORT || 4000;

module.exports = config;
//export const PORT = process.env.PORT || 4000;