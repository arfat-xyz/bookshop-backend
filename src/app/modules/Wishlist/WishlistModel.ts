import { Schema, model } from 'mongoose';
import { ProducModel } from '../product/ProductModel';
import { IWishlist, IWishlistModel } from './WishlistInterface';

const wishlistSchema = new Schema<IWishlist, IWishlistModel>(
  {
    email: {
      type: String,
      required: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: ProducModel,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);
export const WishlistModel = model<IWishlist, IWishlistModel>(
  'wishlish',
  wishlistSchema,
);
