import { Router } from 'express';
import { ProductController } from './ProductController';
import { ProductZod } from './ProductZodValidation';
import zodValidateRequest from '../../middlewares/zodValidateError';

const router = Router();
router.delete('/:id', ProductController.deleteProduct);
router.get('/:id', ProductController.singleProduct);
router.get('/', ProductController.getProducts);
router.post('/comment/:id', ProductController.postComment);
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

export const ProductRoutes = router;
