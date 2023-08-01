import { Schema, model } from 'mongoose';
import { IReading, IReadingModel } from './ReadingInterface';
import { ProducModel } from '../product/ProductModel';

const readingSchema = new Schema<IReading, IReadingModel>(
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
export const ReadingModel = model<IReading, IReadingModel>(
  'read',
  readingSchema,
);
