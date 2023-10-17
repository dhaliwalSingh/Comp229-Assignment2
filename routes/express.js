import express from 'express';
import bodyParser from 'body-parser'; // Import bodyParser separately
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import productRoutes from './product.routes.js';

const app = express();

// Middlewares:
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Fix the missing closing parentheses
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

// Use bodyParser middleware for parsing JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Fix the missing closing parentheses

// Import and use product routes
app.use('/', productRoutes);

export default app;
