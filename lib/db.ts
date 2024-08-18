import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;
  if(!MONGODB_URI)
    throw new Error('please provide mongo uri')


interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    // Type guard to check if `cached.conn.connection` is defined
    if (cached.conn.connection?.db) {
      console.log('Already connected to database:', cached.conn.connection.db.databaseName);
    }
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  cached.conn = await cached.promise;

  // Type guard to ensure `cached.conn.connection` is defined
  if (cached.conn.connection?.db) {
    console.log('Connected to database:', cached.conn.connection.db.databaseName);
  } else {
    console.log('Connection object is undefined.');
  }

  return cached.conn;
}

export default connectToDatabase;
