require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandling');
const path = require("path");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);

// Обработка ошибок, последний Middleware
app.use(errorHandler)


const start = async () => {
    try {
        await sequelize.authenticate();//подключение к бд
        await sequelize.sync();//сверяет состояние бд со схемой данных
        app.listen(PORT, () => {
            console.log(`server has been started on port ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
};

start();
