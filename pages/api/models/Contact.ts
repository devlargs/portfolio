import mongoose, { Document, Schema } from 'mongoose';

export interface Contact extends Document {
  name: string;
  email: string;
  message: string;
}

const ContactSchema = new Schema<Contact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

// eslint-disable-next-line
export default mongoose.models.Contact || mongoose.model<Contact>('Contact', ContactSchema);
