const router = require("express").Router();
const { connect } = require("getstream");
const StreamChat = require("stream-chat").StreamChat;
const crypto = require("crypto");

require("dotenv").config();

const APP_KEY = process.env.APP_KEY;
const APP_SECRET = process.env.APP_SECRET;
const APP_ID = process.env.APP_ID;

router.post("/register", async (req, res) => {
  try {
    const { userName, phoneNumber, fullName, picture } = req.body;

    const userId = crypto.randomBytes(16).toString("hex");
    const serverClient = connect(APP_KEY, APP_ID, APP_ID);

    const token = serverClient.createUserToken(userId);

    const chatClient = new StreamChat(APP_KEY, APP_SECRET);

    await chatClient.upsertUser({
      id: userId,
      name: userName,
      fullName: fullName,
      phoneNumber: phoneNumber,
      image: picture,
    });

    res
      .status(200)
      .json({ token, userName, fullName, userId, phoneNumber, picture });
  } catch (err) {
    res.status(500).json({ message: err });
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { userName, phoneNumber } = req.body;

    const serverClient = connect(APP_KEY, APP_SECRET, APP_ID);
    const client = StreamChat.getInstance(APP_KEY, APP_SECRET);
    const { users } = await client.queryUsers({ name: userName });


    if (!users.length)
      return res.status(400).json({ message: "User not found" });

    const token = serverClient.createUserToken(users[0].id);

    if (token) {
      res.status(200).json({
        token,
        fullName: users[0].fullName,
        userName,
        phoneNumber,
        userId: users[0].id,
      });
    } else {
      res.status(500).json({ message: "Incorrect Phone number !" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

module.exports = router;
