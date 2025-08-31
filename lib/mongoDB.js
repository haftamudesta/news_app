import mongoose from 'mongoose';

// Configure Mongoose to use native promises
mongoose.Promise = global.Promise;

const MONGODB_URI = process.env.MONGODB_URL;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URL environment variable');
}
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectToMongoDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      dbName: process.env.MONGODB_DATABASE || 'newsApp',
      bufferCommands: false,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
      maxPoolSize: 5,
      retryWrites: true,
      ssl: true,
      family: 4, // Use IPv4 only
    };
    console.log('🔷 Attempting MongoDB connection...');

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log('✅ MongoDB connected successfully');
        return mongooseInstance;
      })
      .catch((err) => {
        console.error('❌ MongoDB connection failed:', err.message);
        cached.promise = null;
        throw err;
      });
      mongoose.connection.on('connected', () => {
      console.log('🟢 Mongoose default connection open');
    });

    mongoose.connection.on('error', (err) => {
      console.error('🔴 Mongoose connection error:', err.message);
    });

    mongoose.connection.once('disconnected', () => {
      console.log('🟡 Mongoose connection disconnected');
    });
    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        console.log('🛑 Mongoose connection disconnected through app termination');
        process.exit(0);
      });
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('💥 Failed to establish MongoDB connection:', e.message);
    throw new Error('Database service unavailable. Please try again later.');
  }

  return cached.conn;
};