import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  employed: { type: Boolean, default: false },
} , { timestamps: true });

export interface User extends mongoose.Document {
  name: string;
  description: string;
  employed: boolean;
}
