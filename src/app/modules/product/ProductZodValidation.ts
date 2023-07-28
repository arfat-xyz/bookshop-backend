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
    addBy: z.string({
      required_error: 'Add by who is required',
    }),
  }),
});
const updateProduct = z.object({
  body: z.object({
    author: z.string().optional(),
    genre: z.string().optional(),
    publication_date: z.string().optional(),
    title: z.string().optional(),
    addBy: z.string().optional(),
  }),
});
export const ProductZod = { createProduct, updateProduct };
