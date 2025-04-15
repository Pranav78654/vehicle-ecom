const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const sequelize = require('./config/database');
const models = require('./models');

// Import aggregated schema and resolvers
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

// Import routes
const stateRoutes = require('./routes/stateRoutes');
const designationRoutes = require('./routes/designationRoutes');
const categoryRoutes = require('./routes/categorgyRoutes');
const userRoutes = require('./routes/userRoutes');
const rolesRoutes = require('./routes/rolesRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const regionRoutes = require('./routes/regionRoutes');
const permissionMasterRoutes = require('./routes/permissionMasterRoutes');
const productRoutes = require('./routes/productRoutes');
const productImageRoutes = require('./routes/productImageRoutes');
const productVariantRoutes = require('./routes/productVariantRoutes');
const brandRoutes = require('./routes/brandRoutes');
const carRoutes = require('./routes/carRoutes');      // ✅ Handles image upload
const carTypeRoutes = require('./routes/carTypeRoutes');
const CarImages = require('./routes/carImagesRoutes');
const cartRoutes = require("./routes/cartRoutes");

const app = express();

// ====== Add CORS middleware at the top ======
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Middleware
const corsOptions = {
  origin: 'http://localhost:5173', // ✅ Must be exact origin
  credentials: true                // ✅ Required to allow cookies/auth headers
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ API Routes
app.use('/api', stateRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/user', userRoutes);
app.use('/api', rolesRoutes);
app.use('/api', regionRoutes);
app.use('/designations', designationRoutes);
app.use('/permission_masters', permissionMasterRoutes);
app.use('/api/products', productRoutes);
app.use('/api/product-images', productImageRoutes);
app.use('/api/product-variants', productVariantRoutes);
app.use('/api/brand', brandRoutes);
app.use('/api/car', carRoutes);           // ✅ Updated POST: uses multer
app.use('/api/type', carTypeRoutes);      // ✅ For Car Types
app.use('/api/carimages' , CarImages);
app.use("/api/cart", cartRoutes);
// ✅ Test route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// ✅ Connect to DB
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('Error: ' + err));

sequelize.sync({ alter: false })
  .then(() => console.log('DB synchronized'))
  .catch(err => console.error('Sync error: ' + err));

// ✅ Start Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`GraphQL endpoint is http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
