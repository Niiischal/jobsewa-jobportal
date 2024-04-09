const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Chat = require("../models/chatModel");

router.post("/create-chat", authMiddleware, async (req, res) => {
    try {
      const newChat = new Chat({
        members: [req.body.senderId, req.body.receiverId]
      });
      const result = await newChat.save();
      res.send({
        success: true,
        data: result,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  });

router.get("/get-chat/:id", authMiddleware, async (req, res) => {
    try {
      const chat  = await Chat.find({
        members: {$in: [req.params.id]}
      })
      res.send({
        success: true,
        data: chat,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  });

router.get("/find/:firstId/:secondId", authMiddleware, async (req, res) => {
    try {
      const chat  = await Chat.find({
        members: {$all: [req.params.firstId, req.params.secondId]}
      })
      res.send({
        success: true,
        data: chat,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  });

module.exports = router;

