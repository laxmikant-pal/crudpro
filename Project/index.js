import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import dbConfig from './config/dbConfig';
import authMiddleware from './middleware/authMiddleware';
import errorHandler from './utils/errorHandler';

const app = express();
const PORT = 3000;

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

app.use(express.json());

app.use('/users', userRoutes);
app.use('/users', authMiddleware, userRoutes);
app.use(errorHandler);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});
