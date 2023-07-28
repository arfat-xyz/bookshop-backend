import { Schema, model } from 'mongoose';
import { IProduct, IProductModel } from './ProductInterface';

const productSchema = new Schema<IProduct, IProductModel>(
  {
    author: {
      type: String,
      required: true,
    },
    addBy: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publication_date: {
      type: String,
      required: true,
    },
    reviews: [
      {
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);
export const ProducModel = model<IProduct, IProductModel>(
  'product',
  productSchema,
);
