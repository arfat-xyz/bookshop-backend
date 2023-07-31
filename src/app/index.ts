import { Router } from 'express';
import { ProductRoutes } from './modules/product/ProductRouter';
import { readingRoutes } from './modules/readingList/ReadingRouter';

const router = Router();
const modulesRoute = [
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/reads',
    route: readingRoutes,
  },
];
modulesRoute.filter(mR => router.use(mR.path, mR.route));
export default router;
