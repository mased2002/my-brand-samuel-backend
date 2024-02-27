// import express, { Application, Request, Response, NextFunction } from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// dotenv.config();

// const app: Application = express();

// // Middleware
// app.use(express.json());

// // Database connection
// const MONGODB_URI = process.env.MONGODB_URI as string;
// mongoose.connect(MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error('MongoDB connection error:', err));

// // Routes
// app.get('/', (req: Request, res: Response) => {
//   res.status(200).send({ message: 'Welcome to the API' });
// });

// // Error handling middleware
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   console.error(err.stack);
//   res.status(500).send('Something went wrong!');
// });

// export default app;