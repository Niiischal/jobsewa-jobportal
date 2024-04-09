const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Message = require("../models/messageModel")

router.post("/add-Message", authMiddleware, async (req, res) => {
    try {
      const {chatId, senderId, text} =req.body
      const message  = new Message({
        chatId, senderId, text
      })
      const result = await message.save()
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

router.get("/get-messages/:chatId", authMiddleware, async (req, res) => {
    try {
      const {chatId} =req.params
      const result = await Message.find({chatId})
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

module.exports = router;

