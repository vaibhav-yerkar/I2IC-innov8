import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  startTime: { type: Date, required: true },
  endTime: Date,
  location: String,
  capacity: Number,
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  participants: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
    status: {
      type: String,
      enum: ['going', 'maybe', 'not_going'],
      default: 'going'
    },
    registeredAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Event = mongoose.model('Event', eventSchema);