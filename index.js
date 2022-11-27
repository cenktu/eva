const express = require("express");
const app = express();
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const shareRoute = require("./routes/shares");
const transactionRoute = require("./routes/transaction");


dotenv.config();

//const sequelize = new Sequelize('postgres://' + process.env.USERNAME + ':' + process.env.PASS + '@example.com:5432/dbname') // Example for postgres
const sequelize = new Sequelize('postgres', 'postgres', 'oksouirmam', {
    host: 'localhost',
    dialect: 'postgres'
});
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/api/users", userRoute);
app.use("/api/shares", shareRoute);
//app.use("/api/transaction", transactionRoute);


app.get("/", (req, res) => {

    const value = req.query.value;

    res.send(value + "!123");
});

app.get("/users", (req, res) => {
    res.send("Welcome to user page!")
})

app.listen(8000, () => {
    console.log("Server is running!!")
});