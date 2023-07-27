import { z } from 'zod';

const createProduct = z.object({
  body: z.object({
    author: z.string({
      required_error: 'Author is required',
    }),
    genre: z.string({
      required_error: 'Genre is required',
    }),
    publication_date: z.string({
      required_error: 'Publication date is required',
    }),
    title: z.string({
      required_error: 'title is required',
    }),
  }),
});
export const ProductZod = { createProduct };
