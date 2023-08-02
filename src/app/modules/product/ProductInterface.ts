import { Model } from 'mongoose';

export type IProduct = {
  _id?: string;
  title: string;
  author: string;
  genre: string;
  publication_date: string;
  reviews?: {
    email: string;
    comment: string;
  }[];
  addBy: string;
  image: string;
  finished?: boolean;
};
export type IProductModel = {
  myStaticMethod(): number;
} & Model<IProduct>;
export type IProductFilters = { searchTerm?: string; limit?: string };
