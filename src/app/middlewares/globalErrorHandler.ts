/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler } from 'express';
import mongoose, { CastError } from 'mongoose';
import { ZodError } from 'zod';
// import { Logger } from '../../shared/logger';
import { IGenericErrorMessage } from '../../interface/errors';
import handleValidateError from '../../error/handleValidateError';
import ApiError from '../../error/ApiError';
import handleZodError from '../../error/handleZodError';
import handleCastError from '../../error/handleCastError';
import { config } from '../../config';

// global error handling
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  //   res.status(400).json({ error: err })

  config.env === 'development'
    ? console.log('😀 GlobalErrorHandler', error)
    : console.log('😀 GlobalErrorHandler', error);
  // config.env === 'development'
  //   ? console.log('😀 GlobalErrorHandler', error)
  //   : Logger.errorLogger.error('😀 GlobalErrorHandler', error)
  let statusCode: string | number = 500;
  let message = 'Something went wrong';
  let errorsMessages: IGenericErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidateError(
      error as mongoose.Error.ValidationError,
    );
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorsMessages = simplifiedError.errorsMessages;
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error as CastError);
    console.log(simplifiedError);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorsMessages = simplifiedError.errorsMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorsMessages = error?.message
      ? [{ path: '', message: error.message }]
      : [];
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorsMessages = simplifiedError.errorsMessages;
  } else if (error instanceof Error) {
    message = error?.message;
    errorsMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorsMessages,
    stack: config.env !== 'production' ? error.stack : undefined,
  });

  next();
};
export default globalErrorHandler;
