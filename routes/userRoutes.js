const express = require('express');
const { getUserProfile, adminDashboard, teacherDashboard } = require('../controllers/userController');

const router = express.Router();

router.get('/profile', getUserProfile);      
router.get('/admin', adminDashboard);       
router.get('/teacher', teacherDashboard);  

module.exports = router;
