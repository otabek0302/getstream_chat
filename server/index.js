const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
const PORT = process.env.PORT || 8000;

dotenv.config()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const authRoutes = require("./routes/authRoutes.js");

app.use('/auth', authRoutes);

app.use("/", (req,res) => {
    res.send("Hello world !")
})

app.listen(PORT, ()=> console.log("Server is running in port " + PORT));