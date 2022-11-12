import express from 'express'
import auth from '../../../services/auth';
import controller from './controller';

const router = express.Router();

router.post('/', auth, controller.addCurrentMovie);
router.get('/', auth, controller.fetchAllCurrentMovies);
router.get('/:id', auth, controller.fetchCurrentMovieById);
router.put('/:id', auth, controller.updateCurrentMovie);
router.delete('/:id', auth, controller.deleteCurrentMovie)

export default router