const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const app = express();
const {Client}= require('pg');
const os = require('os');
const port = process.env.PORT || 4000;
//connect to redis
const REDIS_PORT = 6379;
const REDIS_HOST = 'redis';

const redisClient = redis.createClient({url: `redis://${REDIS_HOST}:${REDIS_PORT}`});

redisClient.on('error', (err) => {
  console.error('Error connecting to Redis:', err);
});
redisClient.on('connect', () => {
  console.log('Connected to Redis');
});
redisClient.connect();
//connect to MongoDB
const DB_USERNAME = 'root';
const DB_PASSWORD = 'example';
const DB_PORT =  '27017';
const DB_HOST =  'mongo';
const URI=`mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
// const client = new Client({
// connectionString: URI,
// });

// client.connect()
//   .then(() => console.log('Connected to PostgreSQL'))
//   .catch((err) => console.error('Error connecting to PostgreSQL:', err)); 
mongoose.connect(URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
  console.log(`trafic from: ${os.hostname}` );
redisClient.set('products', 'products data');
  res.send('<h1>i try to get data and test docker hub and watchtower</h1>');

});

app.get('/data', async (req, res) => {
const products = await redisClient.get('products');
  res.send('<h1>hiii welcome</h1> <h2>Products: ' + products + '</h2>');

});