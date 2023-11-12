
const router = require('express').Router();
const controller = require("../controllers/controller")
const auth  = require('../middleware/auth')


router.post('/signUp', controller.signup); 
router.post('/login',controller.login);

router.post('/admin/addMetroLine',auth.adminAuth,controller.addMetroline);
router.post('/admin/addStation', auth.adminAuth,controller.addStation);

// GET DATA OF USERS,STATIONS,METROLINES
router.get('/admin/getAlluser',auth.adminAuth,controller.getAllUsers);
router.get('/admin/getStations',auth.adminAuth,controller.getStations);
router.get('/admin/getMetrolines',auth.adminAuth,controller.getMetrolines);

// DELETE ANY USER,STAION, METROLINES
router.delete('/admin/deleteUser',auth.adminAuth,controller.deleteUser);
router.delete('/admin/deleteStation',auth.adminAuth,controller.deleteStation);
router.delete('/admin/deleteMetroline',auth.adminAuth,controller.deleteMetroline);


// UPDATE DATA OF STATION , METROLINE , USER
router.patch('/admin/updateStation',auth.adminAuth,controller.updateStation)
router.patch('/admin/updateMetroline',auth.adminAuth,controller.updateMetroline)

router.get('/user/getRoute',auth.userAuth,controller.getRoute);

router.post('/logout',auth.adminAuth,controller.logout);

  



module.exports = router