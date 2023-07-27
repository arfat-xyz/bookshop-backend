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
  const result = await ProducModel.find(whereCondition).limit(Number(limit));
  return result;
};
export const ProductService = { createProduct, getProducts };
