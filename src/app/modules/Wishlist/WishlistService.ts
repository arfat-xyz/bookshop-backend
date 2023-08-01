import httpStatus from 'http-status';
import ApiError from '../../../error/ApiError';
import { IProduct } from '../product/ProductInterface';
import { WishlistModel } from './WishlistModel';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createReading = async ({
  id,
  email,
}: {
  id: string;
  email: string;
}): Promise<unknown> => {
  const exist = await WishlistModel.findOne({ email }).populate({
    path: 'products',
  });
  let result;
  if (exist) {
    const check = exist.products.find((product: IProduct) => product._id == id);
    if (check) {
      return exist;
    }
    result = await WishlistModel.updateOne(
      { _id: exist._id },
      {
        $push: { products: id },
      },
    ).populate({
      path: 'products',
    });
  } else {
    const temp = await WishlistModel.create({ email, products: id });
    result = await WishlistModel.findOne({ _id: temp._id }).populate({
      path: 'products',
    });
  }
  return result;
};
const getReading = async ({ email }: { email: string | null }) => {
  if (email == 'null') {
    throw new ApiError(httpStatus.NOT_FOUND, 'Email not found');
  }
  let result = await WishlistModel.findOne({ email }).populate({
    path: 'products',
  });
  if (result === null) {
    result = await WishlistModel.create({ email });
  }
  return result;
};
const deleteReading = async ({ email, id }: { email: string; id: string }) => {
  const result = await WishlistModel.updateOne(
    { email },
    {
      $pull: {
        products: {
          $in: [id],
        },
      },
    },
  );
  /* 
  .populate({
    path: 'products',
  })
  */
  return result;
};
export const ReadingService = {
  createReading,
  getReading,
  deleteReading,
};
