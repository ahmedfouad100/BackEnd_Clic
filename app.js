const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");

const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs')
const path = require('path');

const userRouter = require("./routers/user.routes");
const categoryRouter = require("./routers/category.routes");
const productRouter = require("./routers/product.routes");


const {errorhandler} = require("./middlewares/Error.middleware");
async function DB_connection() {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("DataBase connected successfully");

    } catch (error) {
        console.log(error.message)
    }
}

//app.use(cors());
app.use(cors);

app.use(express.json());
let a = new Date();
const logFile = `${a.getDate()}-${a.getMonth()+1}-${a.getFullYear()}.log`;
const sysLog = fs.createWriteStream(
  path.join(__dirname, logFile),
  { flags: 'a' } 
)
app.use(morgan('combined', { stream: sysLog }))
app.use(morgan('dev'));

DB_connection()
app.use('/users',userRouter);
app.use('/categories',categoryRouter);
app.use('/products', productRouter);

app.use('/uploads', express.static('uploads'));

app.all('/slot', (req, res, next) => {
    const err = new Error(`Can't find ${req.originalUrl} on this server!`);
    err.statusCode = 404;
    next(err); 
});

app.use(errorhandler);

// app.listen(port, () => {
//     console.log(`Server is connected on ${port}`);
// })
module.exports = app;
