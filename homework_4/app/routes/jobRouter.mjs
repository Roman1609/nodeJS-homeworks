import JobController from '../controllers/jobController.mjs'
import { Router } from 'express'

const router = Router()

router.get('/', JobController.mainJobs);
router.get('/create', JobController.getForm);

router.get('/:id', JobController.getJobItem);
router.post('/', JobController.createJob);

export default router 