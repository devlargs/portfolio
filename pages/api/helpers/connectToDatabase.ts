import mongoose from 'mongoose';

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the NEXT_PUBLIC_MONGODB_URI environment variable');
}

const cached = (globalThis as any).mongoose || { conn: null, promise: null };

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
