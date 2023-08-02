import httpStatus from 'http-status';
import ApiError from '../../../error/ApiError';
import { productSearch } from './ProductConstants';
import { IProduct, IProductFilters } from './ProductInterface';
import { ProducModel } from './ProductModel';

const createProduct = async (paylaod: IProduct): Promise<IProduct> => {
  const result = await ProducModel.create(paylaod);
  return result;
};
const getProducts = async (filter: IProductFilters) => {
  // eslint-disable-next-line prefer-const
  let { searchTerm, limit } = filter;
  // eslint-disable-next-line no-unused-expressions
  limit ? limit : (limit = '999');
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: productSearch.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const result = await ProducModel.find(whereCondition)
    .limit(Number(limit))
    .sort({
      createdAt: -1,
    });
  return result;
};
const singleProduct = async (id: string) => {
  const result = await ProducModel.findOne({ _id: id });

  return result;
};
const deleteProduct = async (id: string) => {
  const result = await ProducModel.findOneAndDelete({ _id: id });
  return result;
};
const updateProduct = async (id: string, payload: Partial<IProduct>) => {
  const exist = await ProducModel.findOne({ _id: id });
  if (!exist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }
  const result = await ProducModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const postComment = async (
  id: string,
  payload: { email: string; comment: string },
) => {
  const { email, comment } = payload;
  const exist = await ProducModel.findOne({ _id: id });
  if (!exist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }
  await ProducModel.updateOne(
    { _id: id },
    {
      $push: { reviews: { email, comment } },
    },
  );
  return 'result';
};
export const ProductService = {
  createProduct,
  updateProduct,
  getProducts,
  singleProduct,
  deleteProduct,
  postComment,
};
