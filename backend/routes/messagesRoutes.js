const express = require('express');
const Message = require('../models/Message');
const friendship = require('../models/Friendship');
const authenticate = require('../middlewares/authMiddleware');
const { Op } = require('sequelize');

const router = express.Router();

// Send a message
router.post('/add', authenticate, async (req, res) => {
  try {
    const { content, receiverId } = req.body;
    const message = await Message.create({
      content,
      senderId: req.userId,
      receiverId,
      type: 'sent',
      sentAt: new Date(),
    });

    const message1 = await Message.create({
      content,
      senderId: receiverId,
      receiverId : req.userId,
      type: 'recived',
      sentAt: new Date(),
    });

    friendship.update({lastMessage: content}, {where: {userId: req.userId, friendId: receiverId}});
    friendship.update({lastMessage: content}, {where: {userId: receiverId, friendId: req.userId}});
    friendship.update({lastSeenAt: new Date()}, {where: {userId: receiverId, friendId: req.userId}});
    friendship.update({lastSeenAt: new Date()}, {where: {userId: req.userId, friendId: receiverId}});
    
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Fetch all messages between users
router.post('/', authenticate, async (req, res) => {

  try {
    const { friendId } = req.body;

    if (!friendId) {
      return res.status(400).json({ error: 'friendId is required' });
    }

    const messages = await Message.findAll({
      where: {
        [Op.or]: [  
          { [Op.and]: [
              { senderId: req.userId },
              { receiverId: friendId },
              { type: 'sent' },
          ]},
          { [Op.and]: [
              { senderId: req.userId  },
              { receiverId: friendId },
              { type: 'recived' },
          ]},
        ],
      },
    });
  
    res.json({messages});
  } catch (error) {
    console.error('Error fetching messages:', error);

    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});
module.exports = router;
