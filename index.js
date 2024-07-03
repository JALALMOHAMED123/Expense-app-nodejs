const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expenseRoutes = require('./routes/expenseroutes');
const sequelize = require('./util/database');
const Expense = require('./models/expense');
const app = express();
const expressLayouts = require('express-ejs-layouts');

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Use express-ejs-layouts
app.use(expressLayouts);

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(expenseRoutes);

// Sync database and start server
sequelize
  .sync()
  .then(result => {
    console.log('Database and tables synced');
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
