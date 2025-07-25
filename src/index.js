const express = require('express');
const indexRoutes = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const app = express();

require("dotenv").config();

app.use(express.json());

// Routes
app.use('/', indexRoutes);
app.use(errorHandler);
-
app.get('/', (req, res) => {
    res.send('Hello from express!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});


