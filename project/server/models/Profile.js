import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  avatarUrl: String,
  bio: String,
  interests: [String],
  yearOfStudy: Number,
  major: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Profile = mongoose.model('Profile', profileSchema);