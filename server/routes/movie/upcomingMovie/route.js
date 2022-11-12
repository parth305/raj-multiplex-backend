import express from 'express'
import auth from '../../../services/auth';
import controller from './controller';

const router = express.Router();

router.post('/', auth, controller.addUpcomingMovie);
router.get('/', auth, controller.fetchAllUpcomingMovies);
router.get('/:id', auth, controller.fetchUpcomingMovieById);
router.put('/:id', auth, controller.updateUpcomingMovie);
router.delete('/:id', auth, controller.deleteUpcomingMovie)

export default router