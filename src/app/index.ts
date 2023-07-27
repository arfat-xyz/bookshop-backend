import { Router } from 'express';
import { ProductRoutes } from './modules/product/ProductRouter';

const router = Router();
const modulesRoute = [
  {
    path: '/products',
    route: ProductRoutes,
  },
];
modulesRoute.filter(mR => router.use(mR.path, mR.route));
export default router;
