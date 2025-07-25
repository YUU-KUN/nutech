const express = require('express');
const indexRoutes = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const app = express();
const fileUpload = require('express-fileupload');

require("dotenv").config();

app.use(express.json());
app.use(fileUpload());
app.use(express.static('public'));

// Routes
app.use('/', indexRoutes);
app.use(errorHandler);
app.get('/', (req, res) => {
    res.send('Hello from Nutech!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});


