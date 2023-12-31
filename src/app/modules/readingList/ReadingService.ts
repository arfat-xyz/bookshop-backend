import { IProduct } from '../product/ProductInterface';
import { ReadingModel } from './ReadingModel';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createReading = async ({
  id,
  email,
}: {
  id: string;
  email: string;
}): Promise<unknown> => {
  const exist = await ReadingModel.findOne({ email }).populate({
    path: 'products',
  });
  let result;
  if (exist) {
    const check = exist.products.find((product: IProduct) => product._id == id);
    if (check) {
      return exist;
    }
    result = await ReadingModel.updateOne(
      { _id: exist._id },
      {
        $push: { products: id },
      },
    ).populate({
      path: 'products',
    });
  } else {
    const temp = await ReadingModel.create({ email, products: id });
    result = await ReadingModel.findOne({ _id: temp._id }).populate({
      path: 'products',
    });
  }
  return result;
};
const getReading = async ({ email }: { email: string }) => {
  const result = await ReadingModel.findOne({ email }).populate({
    path: 'products',
  });
  return result;
};
const deleteReading = async ({ email, id }: { email: string; id: string }) => {
  const result = await ReadingModel.updateOne(
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
