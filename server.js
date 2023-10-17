import config from './config/config.js';
import app from './routes/express.js';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to the database!");
})
.catch((error) => {
  console.error("Unable to connect to the database:", error);
});

// Import the product routes (configure the import based on your project structure)
import productRoutes from './routes/product.routes.js';

// Use the product routes
app.use('/api/products', productRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the DressStore application." });
});

app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info('Server started on port %s.', config.port);
});