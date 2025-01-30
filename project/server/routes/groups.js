import express from 'express';
import { Group } from '../models/Group.js';

export const router = express.Router();

// Get all groups
router.get('/', async (req, res) => {
  try {
    const groups = await Group.find().populate('createdBy', 'username fullName avatarUrl');
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new group
router.post('/', async (req, res) => {
  const group = new Group(req.body);
  try {
    const newGroup = await group.save();
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get group by ID
router.get('/:id', async (req, res) => {
  try {
    const group = await Group.findById(req.params.id)
      .populate('createdBy', 'username fullName avatarUrl')
      .populate('members.user', 'username fullName avatarUrl');
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    res.json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Join a group
router.post('/:id/join', async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    const isMember = group.members.some(member => 
      member.user.toString() === req.body.userId
    );

    if (isMember) {
      return res.status(400).json({ message: 'Already a member of this group' });
    }

    group.members.push({
      user: req.body.userId,
      role: 'member'
    });

    await group.save();
    res.json(group);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});