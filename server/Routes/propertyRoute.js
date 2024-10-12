import express from 'express';
import { sellProperty, getProperty, deleteProperty, singleProperty } from '../Controller/propertyController.js'
const router = express.Router();

router.post('/sellProperty', sellProperty);
router.get('/getProperty', getProperty);
router.delete('/deleteProperty/:id', deleteProperty);
router.get('/singleProperty/:id', singleProperty);

export default router; 