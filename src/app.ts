import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { Application } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import allRoutes from './app/index';
const app: Application = express();
app.use(cors());
// parser
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use('/api/v1/', allRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to my Database');
});
app.use(globalErrorHandler);

// Handle Route not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API not found',
      },
    ],
  });
  next();
});
export default app;
