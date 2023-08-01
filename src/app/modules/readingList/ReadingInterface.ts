import { Model } from 'mongoose';
import { IProduct } from '../product/ProductInterface';

export type IReading = {
  _id?: string;
  email: string;
  products: IProduct[];
};
export type IReadingModel = {
  myStaticMethod(): number;
} & Model<IReading>;
