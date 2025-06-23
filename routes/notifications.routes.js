const express = require('express');
const router = express.Router();
const Notification = require('../models/notifications.model.js');

// Get all notifications
router.get('/notifications', async (req, res) => {
  try {
    const notes = await Notification.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

// Create new notification
router.post('/notifications', async (req, res) => {
  try {
    const note = await Notification.create({ text: req.body.text });
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add notification' });
  }
});


// Delete notification
router.delete('/notifications/:id', async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete notification' });
  }
});

module.exports = router;
