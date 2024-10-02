import mongoose, { Schema, Document, Model } from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
  role: 'student' | 'teacher' | 'admin' | 'parent'; // Added role
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin', 'parent'],
    required: true,
  },
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
