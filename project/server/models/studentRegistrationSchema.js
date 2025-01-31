import mongoose from 'mongoose';

const studentRegistrationSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  department: { type: String, required: true },
  academicYear: { type: String, required: true },
});

const StudentRegistration = mongoose.model('StudentRegistration', studentRegistrationSchema);

export default StudentRegistration;