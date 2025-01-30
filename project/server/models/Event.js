import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  // Basic Information
  title: { type: String, required: true },
  startDate: { type: Date, required: true },
  startTime: { type: String, required: true },
  proposedBy: { type: String, required: true },
  eventType: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  eventGoal: { type: String },
  attending: { type: Number },

  // Additional Information
  expectedParticipants: { type: Number },

  // Budget Information
  budgetReport: {
    expectedIncome: [
      {
        description: String,
        price: Number,
        reference: String,
      },
    ],
    expectedExpenses: [
      {
        description: String,
        price: Number,
        reference: String,
      },
    ],
    totalExpectedExpenses: { type: Number },
  },

  // Promotion Details
  promotionDetails: {
    imageUrl: String,
    caption: String,
  },

  // System fields
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
  participants: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
      status: {
        type: String,
        enum: ["going", "maybe", "not_going"],
        default: "going",
      },
      registeredAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Event = mongoose.model("Event", eventSchema);
