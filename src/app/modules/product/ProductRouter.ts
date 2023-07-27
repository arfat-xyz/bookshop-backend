import { Router } from 'express';
import { ProductController } from './ProductController';
import { ProductZod } from './ProductZodValidation';
import zodValidateRequest from '../../middlewares/zodValidateError';

const router = Router();
router.get('/', ProductController.getProducts);
router.post(
  '/',
  zodValidateRequest(ProductZod.createProduct),
  ProductController.createProduct,
);

export const ProductRoutes = router;
