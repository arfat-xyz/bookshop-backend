import { Router } from 'express';
import { ReadingController } from './WishlistController';

const router = Router();

router.post('/', ReadingController.createReading);
router.get('/:email', ReadingController.getReading);
router.delete('/', ReadingController.deleteReading);

export const WishlistRoutes = router;
