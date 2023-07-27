import { Model } from 'mongoose';

export type IProduct = {
  title: string;
  author: string;
  genre: string;
  publication_date: string;
  reviews?: string[];
  image: string;
};
export type IProductModel = {
  myStaticMethod(): number;
} & Model<IProduct>;
export type IProductFilters = { searchTerm?: string; limit?: string };
