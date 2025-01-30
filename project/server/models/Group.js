import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  type: {
    type: String,
    required: true,
    enum: ['hackathon', 'flatmate', 'interest']
  },
  capacity: Number,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  members: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
    role: {
      type: String,
      enum: ['admin', 'moderator', 'member'],
      default: 'member'
    },
    joinedAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Group = mongoose.model('Group', groupSchema);