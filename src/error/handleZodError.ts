import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorMessage } from '../interface/errors';
import { IGenericErrorResponse } from '../interface/common';

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: 'Zod Validatoin Error',
    errorsMessages: errors,
  };
};
export default handleZodError;
