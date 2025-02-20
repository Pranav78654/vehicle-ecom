const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const models = require('./models');
// Import routes
const countryRoutes = require('./routes/countryRoutes');
const categoryRoutes = require('./routes/categorgyRoutes');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test DB connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('Error: ' + err));

// Sync database with { alter: true } to prevent table recreation
sequelize.sync({ alter: true })
  .then(() => console.log('DB synchronized'))
  .catch(err => console.error('Sync error: ' + err));

// Example test route
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Using the countryRoutes for API
app.use('/api', countryRoutes);
app.use('/api/category', categoryRoutes);
// Set up the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
