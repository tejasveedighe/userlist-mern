const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users");

app.use(cors());
app.use(express.json());

mongoose.connect(
    "mongodb+srv://tejasvee:tejasvee123@cluster0.upghg.mongodb.net/merntutorial",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("connected to mongodb");
    }
);

app.get("/getUsers", (req, res) => {
    UserModel.find({}, (err, users) => {
        if (err) {
            res.json(err);
        } else {
            res.json(users);
        }
    });
});

app.post("/createUser", async (req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();

    res.json(user);
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
