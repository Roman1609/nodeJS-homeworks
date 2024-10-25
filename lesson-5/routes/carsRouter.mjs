import { Router } from 'express'
import CarsController from '../controllers/carsController.mjs'
import UploadManager from '../utils/UploadManager.mjs';


const router = Router()
// Ініціалізуйте `upload` за допомогою `UploadManager`
const upload = UploadManager.getUploadStorage(); 

router.get('/home', CarsController.getHomePage);
router.get('/about', CarsController.getAboutPage);

router.get('/addNewCar', CarsController.createAddingForm);
router.post('/', upload.single('carImage'), CarsController.addNewCarToList);


export default router  