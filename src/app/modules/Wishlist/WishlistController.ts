import { Request, Response } from 'express';
import catchAsync from '../../../shared/cacheAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { ReadingService } from './WishlistService';
import { IProduct } from '../product/ProductInterface';

const createReading = catchAsync(async (req: Request, res: Response) => {
  const { id, email } = req.body;
  const result = await ReadingService.createReading({ id, email });
  // eslint-disable-next-line no-unused-expressions, no-undef
  sendResponse<unknown>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wishlist successfully',
    meta: null,
    data: result,
  });
});
const getReading = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.params;
  const result = await ReadingService.getReading({ email });
  // eslint-disable-next-line no-unused-expressions, no-undef
  sendResponse<IProduct[] | null | undefined>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wishlist successfully',
    meta: null,
    data: result?.products,
  });
});
const deleteReading = catchAsync(async (req: Request, res: Response) => {
  const { email, id } = req.body;
  await ReadingService.deleteReading({ email, id });
  // eslint-disable-next-line no-unused-expressions, no-undef
  sendResponse<null | undefined>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wishlish successfully',
    meta: null,
    data: null,
  });
});

export const ReadingController = {
  createReading,
  getReading,
  deleteReading,
};
