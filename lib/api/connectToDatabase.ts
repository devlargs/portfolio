import mongoose from 'mongoose';

const getMongoUri = (): string => {
  const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
  if (!uri) throw new Error('Please define the NEXT_PUBLIC_MONGODB_URI environment variable');
  return uri;
};

const MONGODB_URI = getMongoUri();

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const globalWithMongoose = globalThis as typeof globalThis & { mongoose?: MongooseCache };
const cached: MongooseCache = globalWithMongoose.mongoose || { conn: null, promise: null };
globalWithMongoose.mongoose = cached;

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
