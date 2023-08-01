import { Router } from 'express';
import { ProductController } from './ProductController';
import { ProductZod } from './ProductZodValidation';
import zodValidateRequest from '../../middlewares/zodValidateError';

const router = Router();
router.delete('/', ProductController.deleteProduct);
router.get('/', ProductController.getProducts);
router.post(
  '/',
  zodValidateRequest(ProductZod.createProduct),
  ProductController.createProduct,
);
router.patch(
  '/:id',
  zodValidateRequest(ProductZod.updateProduct),
  ProductController.updateProduct,
);
router.get('/:id', ProductController.singleProduct);

export const ProductRoutes = router;
