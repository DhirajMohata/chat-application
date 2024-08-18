const express = require('express');
const Friendship = require('../models/Friendship');
const authenticate = require('../middlewares/authMiddleware');
const User = require('../models/User');
const { Op } = require('sequelize');

const router = express.Router();

// Mark message as seen and update lastSeenAt
router.post('/:friendId', authenticate, async (req, res) => {
  try {
    const { friendId } = req.params;
    const friendship = await Friendship.findOne({ where: { userId: req.userId, friendId } });
    if (friendship) {
      friendship.lastSeenAt = new Date();
      await friendship.save();
      res.json({ message: 'Friendship updated' });
    } else {
      res.status(404).json({ error: 'Friendship not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update friendship' });
  }
});

// Create a friendship
router.post('/', authenticate, async (req, res) => {
  try {
    const { friendId } = req.body;
    const friend = await User.findOne({ where: { id: friendId } });
    const friend1 = await User.findOne({ where: { id: req.userId } });
    const friendship = await Friendship.create({ userId: req.userId, friendId , friendName : friend.username });
    const friendship1 = await Friendship.create({ userId: friendId, friendId: req.userId , friendName : friend1.username });

    res.status(201).json(friendship);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create friendship' });
  }
});

router.get('/get', authenticate, async (req, res) => {
  try {
    const friendships = await Friendship.findAll({ where: { userId: req.userId } });
    res.json({ friendships });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch friendships' });
  }
});


// Fetch all users who are not friends with the current user
router.get('/potential-friends', authenticate, async (req, res) => {
  try {

    const friends = await Friendship.findAll({ where: { userId: req.userId } });

    const friendIds = friends.map(friendship => friendship.friendId);
    friendIds.push(req.userId);

    const potentialFriends = await User.findAll({
      where: {
        id: { [Op.notIn]: friendIds }
      }
    });

    res.json({ users: potentialFriends });
  } catch (err) {
    console.error('Error fetching potential friends:', err);
    res.status(500).json({ error: 'Failed to fetch potential friends' });
  }
});


module.exports = router;
