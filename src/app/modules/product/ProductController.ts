import { Request, Response } from 'express';
import catchAsync from '../../../shared/cacheAsync';
import { ProductService } from './ProductService';
import { IProduct } from './ProductInterface';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { productsFilter } from './ProductConstants';

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await ProductService.createProduct(payload);
  sendResponse<IProduct | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book created successfully',
    meta: null,
    data: result,
  });
});
const getProducts = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, productsFilter);
  const result = await ProductService.getProducts(filter);
  sendResponse<IProduct[] | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrived successfully',
    meta: null,
    data: result,
  });
});
export const ProductController = {
  getProducts,
  createProduct,
};
