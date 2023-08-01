import { Model } from 'mongoose';
import { IProduct } from '../product/ProductInterface';

export type IWishlist = {
  _id?: string;
  email: string;
  products: IProduct[];
};
export type IWishlistModel = {
  myStaticMethod(): number;
} & Model<IWishlist>;
