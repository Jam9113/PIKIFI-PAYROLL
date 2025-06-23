const express = require('express');
const router = express.Router();
const Leave = require('../models/Leave');


router.post('/', async (req, res) => {
  try {
    const leave = new Leave(req.body);
    const saved = await leave.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Error saving leave request', error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const leaves = await Leave.find().sort({ createdAt: -1 });
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching leaves', error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {P
    const leave = await Leave.findById(req.params.id);
    if (!leave) {
      return res.status(404).json({ message: 'Leave request not found' });
    }
    res.json(leave);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching leave request', error: err.message });
  }
});
router.put('/:id', async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(req 
.params.id, req.body, { new: true });
    if (!leave) {
      return res.status(404).json({ message: 'Leave request not found' });
    }
    res.json(leave);
  }
  catch (err) {
    res.status(400).json({ message: 'Error updating leave request', error: err.message });
  }
}
);

router.delete('/:id', async (req, res) => {
  try {
    const leave = await Leave.findByIdAndDelete(req.params.id);
    if (!leave) {
      return res.status(404).json({ message: 'Leave request not found' });
    }
    res.json({ message: 'Leave request deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting leave request', error: err.message });
  }
} );

module.exports = router;
